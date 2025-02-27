import { createSelector } from '@reduxjs/toolkit';

export const selectTickets = (state) => state.tickets.tickets;
export const selectFilters = (state) => state.filters.filters;
export const selectLoadingStatus = (state) => state.tickets.loading;
export const selectError = (state) => state.tickets.error;
export const selectCurrentPage = (state) => state.tickets.currentPage;

export const selectFilteredTickets = createSelector([selectTickets, selectFilters], (tickets, filters) => {
  if (!tickets || tickets.length === 0) return [];

  const activeFilters = [];
  if (filters.noTransfers) activeFilters.push(0);
  if (filters.oneTransfer) activeFilters.push(1);
  if (filters.twoTransfers) activeFilters.push(2);
  if (filters.threeTransfers) activeFilters.push(3);

  if (activeFilters.length === 0) return [];

  return tickets.filter((ticket) => {
    const segments = ticket.segments;
    return segments.some((segment) => activeFilters.includes(segment.stops.length));
  });
});
