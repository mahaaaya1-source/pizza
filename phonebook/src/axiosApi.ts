import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://phonebook-redux-default-rtdb.firebaseio.com',
});
