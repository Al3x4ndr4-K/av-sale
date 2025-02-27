import { useDispatch } from 'react-redux';

import { setCurrentPage } from '../store/tickets/tickets.slice.js';

export const usePaginationHandler = () => {
  const dispatch = useDispatch();
  return (page) => dispatch(setCurrentPage(page));
};
