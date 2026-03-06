import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const getSettings = () => api.get('/settings');
export const saveSettings = (data) => api.put('/settings', data);

export const getCustomers = () => api.get('/customers');
export const createCustomer = (data) => api.post('/customers', data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

export const getAppointments = () => api.get('/appointments');
export const createAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

export const getInstagramContacts = () => api.get('/instagram-contacts');
export const createInstagramContact = (data) => api.post('/instagram-contacts', data);
export const sendInstagramCampaign = (imageBase64, message) =>
  api.post('/instagram-campaign/send', { imageBase64, message });
