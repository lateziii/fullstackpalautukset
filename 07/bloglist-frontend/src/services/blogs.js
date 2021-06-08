import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getOne= (blog) => {
  const request = axios.get(`baseUrl/${blog.id}`)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
} 

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const like = (newObject) => {
  newObject.likes += 1
  const request = axios.put(`${baseUrl}/${newObject._id}`, newObject)
  return request.then(response => response.data)
}
const comment = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject._id}`, newObject)
  return request.then(response => response.data)
}

const remove = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${newObject._id}`, config)
  return request.then(response => response.data)
}

export  default { getAll, getOne, create, setToken, like, remove, comment }