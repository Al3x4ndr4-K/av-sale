export const getTotalDuration = (ticket) => {
  return ticket.segments.reduce((total, segment) => total + segment.duration, 0);
};
