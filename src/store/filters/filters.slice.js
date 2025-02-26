import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    all: false,
    noTransfers: false,
    oneTransfer: false,
    twoTransfers: false,
    threeTransfers: false,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter(state, action) {
      const filterName = action.payload;

      if (filterName === 'all') {
        const allChecked = !state.filters.all;
        state.filters = {
          all: allChecked,
          noTransfers: allChecked,
          oneTransfer: allChecked,
          twoTransfers: allChecked,
          threeTransfers: allChecked,
        };
      } else {
        state.filters[filterName] = !state.filters[filterName];

        state.filters.all =
          state.filters.noTransfers &&
          state.filters.oneTransfer &&
          state.filters.twoTransfers &&
          state.filters.threeTransfers;

        if (!state.filters[filterName]) {
          state.filters.all = false;
        }
      }
    },
  },
});

export const { toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
