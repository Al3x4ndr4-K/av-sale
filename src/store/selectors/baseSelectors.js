export const selectTickets = (state) => state.tickets.tickets;
export const selectFilters = (state) => state.filters.filters;
export const selectLoadingStatus = (state) => state.tickets.loading;
export const selectError = (state) => state.tickets.error;
export const selectCurrentPage = (state) => state.tickets.currentPage;
export const selectSort = (state) => state.sort.sort;
export const selectVisibleCount = (state) => state.tickets.visibleCount;
export const selectIsLoadingMore = (state) => state.tickets.isLoadingMore;
