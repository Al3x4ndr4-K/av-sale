export const getUniqueTickets = (tickets) => {
  if (!tickets || tickets.length === 0) return [];

  return tickets.filter(
    (ticket, index, self) =>
      index ===
      self.findIndex((t) => t.price === ticket.price && JSON.stringify(t.segments) === JSON.stringify(ticket.segments))
  );
};

export const filterByTransfers = (tickets, activeFilters) => {
  if (activeFilters.length === 0) return [];

  return tickets.filter((ticket) => ticket.segments.some((segment) => activeFilters.includes(segment.stops.length)));
};
