import axios from 'axios'

const api = axios.create({
  baseURL: 'https://senacpos-tcc.herokuapp.com/'
})

export function validateToken(token) {
  return api.post('/validate-token', { token })
}

export function signin(email, password) {
  return api.post('/authenticate', { email, password })
}

export function createAccount(name, email, password) {
  return api.post('/users', { name, email, password })
}

export function forgotPassword(email) {
  return api.post('/forgot-password', { email })
}

export function updateUser(id, name, email, password, token) {
  return api.put(`/users/${id}`, { name, email, password }, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}
