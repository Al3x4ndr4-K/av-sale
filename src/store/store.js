import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './filters/filters.slice.js';
import sortReducer from './sort/sort.slice.js';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
  },
});
