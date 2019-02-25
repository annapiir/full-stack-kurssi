import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const credential = { username: credentials.name, password: credentials.word }
  const response = await axios.post(baseUrl, credential)
  return response.data
}

export default { login }