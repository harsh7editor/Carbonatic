import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tripsService from '../../services/tripsService';

const initialState = {
  trips: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const getTrips = createAsyncThunk(
  'trips/getAll',
  async (_, thunkAPI) => {
    try {
      return await tripsService.getTrips();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTrip = createAsyncThunk(
  'trips/create',
  async (tripData, thunkAPI) => {
    try {
      return await tripsService.createTrip(tripData);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTrip = createAsyncThunk(
  'trips/update',
  async ({ id, tripData }, thunkAPI) => {
    try {
      return await tripsService.updateTrip(id, tripData);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTrip = createAsyncThunk(
  'trips/delete',
  async (id, thunkAPI) => {
    try {
      await tripsService.deleteTrip(id);
      return id;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const tripsSlice = createSlice({
  name: 'trips',
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
      .addCase(getTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips.push(action.payload);
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        const index = state.trips.findIndex(trip => trip.id === action.payload.id);
        if (index !== -1) {
          state.trips[index] = action.payload;
        }
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips = state.trips.filter(trip => trip.id !== action.payload);
      });
  },
});

export const { reset } = tripsSlice.actions;
export default tripsSlice.reducer;
