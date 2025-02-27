export const paginateTickets = (tickets, currentPage, ticketsPerPage) => {
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  return tickets.slice(indexOfFirstTicket, indexOfLastTicket);
};

export const calculatePageCount = (tickets, ticketsPerPage) => {
  return Math.ceil(tickets.length / ticketsPerPage);
};
