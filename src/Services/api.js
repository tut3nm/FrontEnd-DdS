import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getAll = (resource, config = {}) => API.get(`/${resource}`, config);

export const getById = (resource, id, config = {}) => API.get(`/${resource}/${id}`, config);

export const create = (resource, data, config = {}) => API.post(`/${resource}`, data, config);

export const update = (resource, id, data, config = {}) => API.put(`/${resource}/${id}`, data, config);

export const remove = (resource, id, config = {}) => API.delete(`/${resource}/${id}`, config);
