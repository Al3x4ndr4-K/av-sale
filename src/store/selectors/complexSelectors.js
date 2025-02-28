import { createSelector } from '@reduxjs/toolkit';

import { filterByTransfers, getUniqueTickets } from '../../utils/filters/ticketUtils';
import { getActiveFilters } from '../../utils/filters/getActiveFiltersUtil.js';
import { sortStrategies } from '../../utils/sort/sortStrategies.js';
import { TOTAL_TICKETS } from '../../utils/constants/ticketsConstUtil.js';

import { selectFilters, selectSort, selectTickets, selectVisibleCount } from './baseSelectors.js';

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

export const selectVisibleTickets = createSelector(
  [selectSortedTickets, selectVisibleCount],
  (sortedTickets, visibleCount) => {
    return sortedTickets.slice(0, visibleCount);
  }
);

export const selectLoadingProgress = createSelector([(state) => state.tickets.tickets.length], (ticketsCount) =>
  Math.min((ticketsCount / TOTAL_TICKETS) * 100, 100)
);
