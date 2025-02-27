import { createSelector } from '@reduxjs/toolkit';

import { filterByTransfers, getUniqueTickets } from '../../utils/ticketUtils.js';
import { getActiveFilters } from '../../utils/getActiveFiltersUtil.js';
import { sortStrategies } from '../../utils/sortStrategies.js';

import { selectFilters, selectSort, selectTickets } from './baseSelectors.js';

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
