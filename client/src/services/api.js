import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Patient API
export const submitPatient = async (patientData) => {
  const response = await axios.post(`${API_URL}/patient`, patientData);
  return response.data;
};

export const getPatients = async () => {
  const response = await axios.get(`${API_URL}/patient`);
  return response.data;
};

// Volunteer API
export const submitVolunteer = async (volunteerData) => {
  const response = await axios.post(`${API_URL}/volunteer`, volunteerData);
  return response.data;
};

export const getVolunteers = async () => {
  const response = await axios.get(`${API_URL}/volunteer`);
  return response.data;
};

// Contact API
export const submitContact = async (contactData) => {
  const response = await axios.post(`${API_URL}/contact`, contactData);
  return response.data;
};

export const getContacts = async () => {
  const response = await axios.get(`${API_URL}/contact`);
  return response.data;
};

// Chatbot API
export const sendChatMessage = async (message) => {
  const response = await axios.post(`${API_URL}/chatbot`, { message });
  return response.data;
};