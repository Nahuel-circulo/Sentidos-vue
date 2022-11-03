import axios from 'axios';

export const api_django = axios.create({ baseURL: 'https://payloadback-production.up.railway.app/api' })
// export const api_django = axios.create({ baseURL: 'https://nahuelnp.pythonanywhere.com/api' })