import axios from 'axios';

const API_URL = '/api/places/';

const unwrap = (data) => (data && Array.isArray(data.content) ? data.content : data);

const getPlaces = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return unwrap(response.data);
};

const getPlaceById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const searchPlaces = async (query) => {
  const response = await axios.get(API_URL + 'search', {
    params: { query }
  });
  return unwrap(response.data);
};

const getNearbyPlaces = async (coordinates) => {
  const response = await axios.get(API_URL + 'nearby', {
    params: coordinates
  });
  return unwrap(response.data);
};

const getPlacesByCategory = async (category) => {
  const response = await axios.get(API_URL + 'category/' + category);
  return unwrap(response.data);
};

const getPlacesByCity = async (city) => {
  const response = await axios.get(API_URL + 'city/' + city);
  return unwrap(response.data);
};

const getTopRatedPlaces = async () => {
  const response = await axios.get(API_URL + 'top-rated');
  return unwrap(response.data);
};

const placesService = {
  getPlaces,
  getPlaceById,
  searchPlaces,
  getNearbyPlaces,
  getPlacesByCategory,
  getPlacesByCity,
  getTopRatedPlaces,
};

export default placesService;
