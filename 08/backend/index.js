const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.SECRET
const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB', process.env.MONGODB_URI)
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!
    author: Author!
    id: ID!,
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if(args.author && args.genre) {
        return Book.find({author: args.author, genres: args.genre})
      }
      if(args.author && !args.genre) {
        return Book.find({author: args.author})
      }
      if(!args.author && args.genre) {
        return Book.find({genres: args.genre}).populate('author')
      }
      if(!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: () => { return Author.find({}).populate('bookCount')},
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({name: args.author}) 
      if(author!==null) {
        try {
          const book = new Book({
            title: args.title,
            published: args.published,
            author: author,
            id: uuid(),
            genres: [...args.genres]
          })
          const response = await book.save()
          pubsub.publish('BOOK_ADDED', {bookAdded: book})
          return book
              
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
        })
        }
              
      } else {
        const newAuthor = new Author({name: args.author, born: null, id: uuid()})
        newAuthor.save()
        const book = new Book({
          title: args.title,
          published: args.published,
          author: newAuthor,
          id: uuid(),
          genres: [...args.genres]
        })
        const response = await book.save()
        pubsub.publish('BOOK_ADDED', {bookAdded: book})
        return book
      }
    },
    editAuthor: async (root, args, context) => {
      

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({name: args.name})
      if(author !== null) {
        author.born = args.setBornTo
        const response = await author.save()
        return author
      } else {
        return null
      }
    },
    createUser: (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
      return user.save().catch(error => {
        throw new UserInputError(error.message, {invalidArgs: args})
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Author: {
    bookCount: (root) => Book.countDocuments({ author: root })
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})