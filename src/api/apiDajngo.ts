import axios from 'axios';

export const api_django = axios.create({ baseURL: 'https://nahuelnp.pythonanywhere.com/api' })