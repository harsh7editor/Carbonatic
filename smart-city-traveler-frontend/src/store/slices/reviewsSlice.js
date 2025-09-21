import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewsService from '../../services/reviewsService';

const initialState = {
  reviews: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const getReviews = createAsyncThunk(
  'reviews/getAll',
  async (placeId, thunkAPI) => {
    try {
      return await reviewsService.getReviews(placeId);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/create',
  async (reviewData, thunkAPI) => {
    try {
      return await reviewsService.createReview(reviewData);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reviewsSlice.actions;
export default reviewsSlice.reducer;
