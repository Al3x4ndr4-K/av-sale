import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchSearchId as fetchSearchIdApi, fetchTickets as fetchTicketsApi } from '../../api/ticketsApi.js';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  return await fetchSearchIdApi();
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId, { rejectWithValue }) => {
  try {
    return await fetchTicketsApi(searchId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  tickets: [],
  loading: 'idle',
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.tickets = [...state.tickets, ...action.payload.tickets];
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default ticketsSlice.reducer;
