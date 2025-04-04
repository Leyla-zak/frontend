import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Адрес вашего FastAPI
});

export const getEvents = () => API.get('/get_events');
export const addEvent = (event) => API.post('/add_event', event);