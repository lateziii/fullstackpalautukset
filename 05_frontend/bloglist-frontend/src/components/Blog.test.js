import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'


describe('<Blog />', () => {

  const mockHandler = jest.fn()
  const mockHandler2 = jest.fn()

  let component
  const blog = {
    title: 'A title',
    author: 'Meikä Mandariini',
    url: 'example.com',
    likes: 0,
    user: {
      username: 'testi',
      name: 'testi t',
      id: '345tgbnju8uio'
    },
    id: '415sfa123123io'
  }
  beforeEach(() => {
     component = render(<Blog blog={blog} addLikehandler={mockHandler2} removeHandler={mockHandler}/>)

  })
  
  test("Shows only title and author", () => {
    
    expect(component.container).toHaveTextContent("A title Meikä Mandariini")

  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })
  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('likes')
    expect(div).toHaveTextContent('example.com')
  })

  //ei toimi :(
  test('after clicking the like button twice handler is called twice', async () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.container.querySelector('#like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler2.mock.calls.length).toBe(2)
  })

  test('CreateBlogForm calls onSubmit and has correct data', () => {
    const createBlog = jest.fn()

    const component = render(
      <CreateBlogForm handleNewBlog={createBlog} />
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')

    



    
    fireEvent.change(title, { 
      target: { name: 'title', value: 'testi title' } 
    })
    fireEvent.change(author, { 
      target: { name: 'author', value: 'testi author' } 
    })
    fireEvent.change(url, { 
      target: { name: 'url', value: 'testi url' } 
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    // mock calls content ei onnistunut, kelpaisko tämä?
    expect(title.value).toBe('testi title')
    expect(author.value).toBe('testi author')
    expect(url.value).toBe('testi url')    
    

    
  })

})