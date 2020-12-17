import axios from 'axios';

const signup = (username, password, firstName, lastName, email) => {
  return axios
  .post('/auth/signup', { username, password, firstName, lastName, email })
  .then(response => {
    return response.data
  })
  .catch(err => {
    return err.response.data
  });
}

const login = (username, password) => {
  return axios
  .post('/auth/login', { username, password })
  .then(response => response.data )
  .catch(err => err.response.data );
}

const logout = () => {
  return axios
  .delete('/auth/logout')
  .then(response => response.data )
  .catch(err => err.response.data );
}

export { signup, login, logout };