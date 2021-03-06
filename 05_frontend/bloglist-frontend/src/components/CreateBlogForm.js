import React, {useState} from 'react'

const CreateBlogForm = ({handleNewBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('') 
    const submit = event => {
        event.preventDefault()
        const blog = { title, author, url }
        handleNewBlog(blog)
      }   
    return(
        <div>
        <h2>create new</h2>
        <form id="form" onSubmit={submit}>
            <div>
            title
                <input
                id='title'
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            author
                <input
                id='author'
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
            />
            </div>
            <div>
            url
                <input
                id='url'
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
            />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}
    
export default CreateBlogForm