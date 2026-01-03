import axios from 'axios';

const API_URL = '/api/contacts';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all contacts
export const getContacts = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

// Create a new contact
export const createContact = async (contactData) => {
  const response = await api.post(API_URL, contactData);
  return response.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
};

export default api;

