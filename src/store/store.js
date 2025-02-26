import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './filters/filters.slice.js';
import sortReducer from './sort/sort.slice.js';
import ticketsReducer from './tickets/tickets.slice.js';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
