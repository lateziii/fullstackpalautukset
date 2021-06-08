import { connect } from 'react-redux'
import { infoNotification, alertNotification } from '../reducers/alertReducer'
import { createBlog} from '../reducers/blogReducer'


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
        <div>
        <h2>create new</h2>
        <form id="form" onSubmit={submit}>
            <div>
            title
                <input
                id='title'
                type="text"
                name="title"
            />
            </div>
            <div>
            author
                <input
                id='author'
                type="text"
                name="author"
            />
            </div>
            <div>
            url
                <input
                id='url'
                type="text"
                name="url"
            />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}
const mapDispatchToProps = {
    infoNotification,
    alertNotification,
    createBlog
}

const ConnectedBlogs = connect(null, mapDispatchToProps)(CreateBlogForm)
    
export default ConnectedBlogs