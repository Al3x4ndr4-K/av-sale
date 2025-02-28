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
  currentPage: 1,
  loading: 'idle',
  error: null,
  hasMore: true,
  itemsPerPage: 5,
  searchId: null,
  visibleCount: 5,
  isLoadingMore: false,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    increaseVisibleCount: (state) => {
      state.visibleCount += 5;
    },
    setLoadingMore: (state, action) => {
      state.isLoadingMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.loading = 'loading';
        state.searchId = action.payload;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTickets.pending, (state) => {
        if (state.tickets.length === 0) {
          state.loading = 'loading';
        }
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.hasMore = !action.payload.stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, increaseVisibleCount, setLoadingMore } = ticketsSlice.actions;

export const selectCurrentPageTickets = (state) => {
  const { tickets, currentPage, itemsPerPage } = state.tickets;
  const startIndex = 0;
  const endIndex = currentPage * itemsPerPage;
  return tickets.slice(startIndex, endIndex);
};

export const selectVisibleTickets = (state) => {
  return state.tickets.tickets.slice(0, state.tickets.visibleCount);
};

export default ticketsSlice.reducer;
