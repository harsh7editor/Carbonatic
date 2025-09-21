import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placesService from '../../services/placesService';

const initialState = {
  places: [],
  isLoading: false,
  isError: false,
  message: '',
};

const coercePlaces = (payload) => {
  if (!payload) return [];
  return Array.isArray(payload) ? payload : (Array.isArray(payload.content) ? payload.content : []);
};

export const getPlaces = createAsyncThunk(
  'places/getAll',
  async (params, thunkAPI) => {
    try {
      return await placesService.getPlaces(params);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchPlaces = createAsyncThunk(
  'places/search',
  async (query, thunkAPI) => {
    try {
      return await placesService.searchPlaces(query);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNearbyPlaces = createAsyncThunk(
  'places/nearby',
  async (coordinates, thunkAPI) => {
    try {
      return await placesService.getNearbyPlaces(coordinates);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPlacesByCategory = createAsyncThunk(
  'places/byCategory',
  async (category, thunkAPI) => {
    try {
      return await placesService.getPlacesByCategory(category);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const placesSlice = createSlice({
  name: 'places',
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
      .addCase(getPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = coercePlaces(action.payload);
      })
      .addCase(getPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = coercePlaces(action.payload);
      })
      .addCase(searchPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNearbyPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNearbyPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = coercePlaces(action.payload);
      })
      .addCase(getNearbyPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPlacesByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlacesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = coercePlaces(action.payload);
      })
      .addCase(getPlacesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = placesSlice.actions;
export default placesSlice.reducer;
