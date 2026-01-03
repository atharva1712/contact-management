import axios from 'axios';

// Use environment variable for API URL in production, or proxy in development
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const API_URL = `${API_BASE_URL}/api/contacts`;

const api = axios.create({
  baseURL: API_BASE_URL,
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

