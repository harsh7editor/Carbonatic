import axios from 'axios';

const API_URL = '/api/reviews/';

const getReviews = async (placeId) => {
  const response = await axios.get(API_URL + 'place/' + placeId);
  return response.data;
};

const createReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData);
  return response.data;
};

const updateReview = async (id, reviewData) => {
  const response = await axios.put(API_URL + id, reviewData);
  return response.data;
};

const deleteReview = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const reviewsService = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewsService;
