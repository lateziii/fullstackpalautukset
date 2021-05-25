require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const PORT = process.env.PORT
var morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body))

const cors = require('cors')
const Person = require('./models/person').default

app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :response-time ms :body'))


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
      .catch(error => next(error))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  console.log(id)
  Person.findById(req.params.id).then(person => {
    if(person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.count({}).then(count => {
    res.send(`<p>Phonebook has info for ${count} persons</p><p>${new Date()}</p>`)
  })
})

app.delete('/api/persons/:id', (req, response, next) => {
  console.log(req.params.id)
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }


  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
  morgan.token('postaus', (req) => JSON.stringify(req.body))
  app.use(morgan('postaus'))
}) 
app.put('/api/persons/:id', (request, response, next) => {
  const body= request.body
  const person= {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
}) 

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})