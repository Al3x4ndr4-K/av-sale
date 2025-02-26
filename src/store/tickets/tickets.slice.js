import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search');
  if (!response.ok) {
    throw new Error('Не удалось получить searchId');
  }
  const data = await response.json();
  return data.searchId;
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    return await response.json();
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
