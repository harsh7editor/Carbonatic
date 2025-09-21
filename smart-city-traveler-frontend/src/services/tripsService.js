import axios from 'axios';

const API_URL = '/api/trips/';

const getTrips = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getTripById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const createTrip = async (tripData) => {
  const response = await axios.post(API_URL, tripData);
  return response.data;
};

const updateTrip = async (id, tripData) => {
  const response = await axios.put(API_URL + id, tripData);
  return response.data;
};

const deleteTrip = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const tripsService = {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};

export default tripsService;
