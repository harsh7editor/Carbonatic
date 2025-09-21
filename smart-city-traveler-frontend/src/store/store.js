import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import placesReducer from './slices/placesSlice';
import tripsReducer from './slices/tripsSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    places: placesReducer,
    trips: tripsReducer,
    reviews: reviewsReducer,
  },
});
