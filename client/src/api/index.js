import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000' });

export const predict_image = (formData, style) => API.post(`/urlRoute/${style}`, formData);

export const predict_file = (fromData, style) => API.post(`/upload-image/${style}`, fromData);

export const fetch_labels = (style) => API.get(`/fetchLabels?labelsType=${style}`)