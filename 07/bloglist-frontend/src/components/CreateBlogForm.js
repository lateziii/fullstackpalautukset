import { connect } from 'react-redux'
import { infoNotification, alertNotification } from '../reducers/alertReducer'
import { createBlog} from '../reducers/blogReducer'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const CreateBlogForm = (props) => {
    const submit = (event) => {
        event.preventDefault()
        const blog = { title: event.target.title.value, author: event.target.author.value, url: event.target.url.value }
        if(blog.title === '' || blog.author===''|| blog.url ==='') {
            props.alertNotification('fields missing!', 5)
        }else {
            props.createBlog(blog)
            props.infoNotification(`a new blog ${blog.title} by ${blog.author} was added`, 3)
        }
            
        
        
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
       
    }
  
    return(
        <Card>
        <h2>create new</h2>
        <form id="form" onSubmit={submit}>
            <div>
            title
                <TextField
                id='title'
                type="text"
                name="title"
            />
            </div>
            <div>
            author
                <TextField
                id='author'
                type="text"
                name="author"
            />
            </div>
            <div>
            url
                <TextField
                id='url'
                type="text"
                name="url"
            />
            </div>
            <br/>
            <Button color='primary' variant='contained' type="submit">create</Button>
        </form>
        <br/>
        </Card>
    )
}
const mapDispatchToProps = {
    infoNotification,
    alertNotification,
    createBlog
}

const ConnectedBlogs = connect(null, mapDispatchToProps)(CreateBlogForm)
    
export default ConnectedBlogs