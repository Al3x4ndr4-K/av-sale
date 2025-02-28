export const getActiveFilters = (filters) => {
  const activeFilters = [];
  if (filters.noTransfers) activeFilters.push(0);
  if (filters.oneTransfer) activeFilters.push(1);
  if (filters.twoTransfers) activeFilters.push(2);
  if (filters.threeTransfers) activeFilters.push(3);
  return activeFilters;
};
