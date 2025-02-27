import { createSelector } from '@reduxjs/toolkit';

import { normalize } from '../../utils/normalaze.js';
import { getTotalDuration } from '../../utils/durationTotalUtil.js';

export const selectTickets = (state) => state.tickets.tickets;
export const selectFilters = (state) => state.filters.filters;
export const selectLoadingStatus = (state) => state.tickets.loading;
export const selectError = (state) => state.tickets.error;
export const selectCurrentPage = (state) => state.tickets.currentPage;
export const selectSort = (state) => state.sort.sort;

const getUniqueTickets = (tickets) => {
  if (!tickets || tickets.length === 0) return [];

  return tickets.filter(
    (ticket, index, self) =>
      index ===
      self.findIndex((t) => t.price === ticket.price && JSON.stringify(t.segments) === JSON.stringify(ticket.segments))
  );
};

const getActiveFilters = (filters) => {
  const activeFilters = [];
  if (filters.noTransfers) activeFilters.push(0);
  if (filters.oneTransfer) activeFilters.push(1);
  if (filters.twoTransfers) activeFilters.push(2);
  if (filters.threeTransfers) activeFilters.push(3);
  return activeFilters;
};

const filterByTransfers = (tickets, activeFilters) => {
  if (activeFilters.length === 0) return [];

  return tickets.filter((ticket) => ticket.segments.some((segment) => activeFilters.includes(segment.stops.length)));
};

const sortByPrice = (tickets) => [...tickets].sort((a, b) => a.price - b.price);

const sortByDuration = (tickets) => [...tickets].sort((a, b) => getTotalDuration(a) - getTotalDuration(b));

const sortByOptimal = (tickets) => {
  const minPrice = Math.min(...tickets.map((t) => t.price));
  const maxPrice = Math.max(...tickets.map((t) => t.price));
  const minDuration = Math.min(...tickets.map(getTotalDuration));
  const maxDuration = Math.max(...tickets.map(getTotalDuration));

  return [...tickets].sort((a, b) => {
    const normalizedPriceA = normalize(a.price, minPrice, maxPrice);
    const normalizedPriceB = normalize(b.price, minPrice, maxPrice);
    const normalizedDurationA = normalize(getTotalDuration(a), minDuration, maxDuration);
    const normalizedDurationB = normalize(getTotalDuration(b), minDuration, maxDuration);

    return normalizedPriceA + normalizedDurationA - (normalizedPriceB + normalizedDurationB);
  });
};

const sortStrategies = {
  cheapest: sortByPrice,
  fastest: sortByDuration,
  optimal: sortByOptimal,
};

export const selectFilteredTickets = createSelector([selectTickets, selectFilters], (tickets, filters) => {
  const uniqueTickets = getUniqueTickets(tickets);
  const activeFilters = getActiveFilters(filters);
  return filterByTransfers(uniqueTickets, activeFilters);
});

export const selectSortedTickets = createSelector([selectFilteredTickets, selectSort], (filteredTickets, sort) => {
  if (!filteredTickets || filteredTickets.length === 0) return [];

  const sortStrategy = sortStrategies[sort] || ((tickets) => tickets);
  return sortStrategy(filteredTickets);
});
