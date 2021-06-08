import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}
const logout = async () => {
  const response = localStorage.clear()
  return response.data
}
  
  export default  { login, logout }