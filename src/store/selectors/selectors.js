import { createSelector } from '@reduxjs/toolkit';

import { normalize } from '../../utils/normalaze.js';
import { getTotalDuration } from '../../utils/durationTotalUtil.js';

export const selectTickets = (state) => state.tickets.tickets;
export const selectFilters = (state) => state.filters.filters;
export const selectLoadingStatus = (state) => state.tickets.loading;
export const selectError = (state) => state.tickets.error;
export const selectCurrentPage = (state) => state.tickets.currentPage;
export const selectSort = (state) => state.sort.sort;

export const selectFilteredTickets = createSelector([selectTickets, selectFilters], (tickets, filters) => {
  if (!tickets || tickets.length === 0) return [];

  const uniqueTickets = tickets.filter(
    (ticket, index, self) =>
      index ===
      self.findIndex((t) => t.price === ticket.price && JSON.stringify(t.segments) === JSON.stringify(ticket.segments))
  );

  const activeFilters = [];
  if (filters.noTransfers) activeFilters.push(0);
  if (filters.oneTransfer) activeFilters.push(1);
  if (filters.twoTransfers) activeFilters.push(2);
  if (filters.threeTransfers) activeFilters.push(3);

  if (activeFilters.length === 0) return [];

  return uniqueTickets.filter((ticket) => {
    const segments = ticket.segments;
    return segments.some((segment) => activeFilters.includes(segment.stops.length));
  });
});

export const selectSortedTickets = createSelector([selectFilteredTickets, selectSort], (filteredTickets, sort) => {
  if (!filteredTickets || filteredTickets.length === 0) return [];

  switch (sort) {
    case 'cheapest':
      return [...filteredTickets].sort((a, b) => a.price - b.price);

    case 'fastest':
      return [...filteredTickets].sort((a, b) => getTotalDuration(a) - getTotalDuration(b));

    case 'optimal':
      const minPrice = Math.min(...filteredTickets.map((t) => t.price));
      const maxPrice = Math.max(...filteredTickets.map((t) => t.price));
      const minDuration = Math.min(...filteredTickets.map(getTotalDuration));
      const maxDuration = Math.max(...filteredTickets.map(getTotalDuration));

      return [...filteredTickets].sort((a, b) => {
        const normalizedPriceA = normalize(a.price, minPrice, maxPrice);
        const normalizedPriceB = normalize(b.price, minPrice, maxPrice);
        const normalizedDurationA = normalize(getTotalDuration(a), minDuration, maxDuration);
        const normalizedDurationB = normalize(getTotalDuration(b), minDuration, maxDuration);

        const scoreA = normalizedPriceA + normalizedDurationA;
        const scoreB = normalizedPriceB + normalizedDurationB;

        return scoreA - scoreB;
      });

    default:
      return filteredTickets;
  }
});
