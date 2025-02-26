import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search');
  if (!response.ok) {
    throw new Error('Не удалось получить searchId');
  }
  const data = await response.json();
  return data.searchId;
});

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { getState, rejectWithValue }) => {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении билетов');
      }
      const data = await response.json();
      return data; // Возвращает { tickets: [], stop: false }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tickets: [], // Массив всех полученных билетов
  loading: 'idle', // Состояние загрузки ('idle', 'loading', 'succeeded', 'failed')
  error: null, // Ошибка, если что-то пошло не так
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка получения searchId
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.loading = 'loading'; // Начинаем загрузку билетов
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      // Обработка получения билетов
      .addCase(fetchTickets.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.tickets = [...state.tickets, ...action.payload.tickets]; // Добавляем новые билеты
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default ticketsSlice.reducer;
