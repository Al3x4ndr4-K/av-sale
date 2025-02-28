import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectError,
  selectFilteredTickets,
  selectSortedTickets,
  selectVisibleTickets,
} from '../store/selectors/selectors';
import { increaseVisibleCount, setLoadingMore } from '../store/tickets/tickets.slice';
import { LOADING_DELAY } from '../utils/constants/ticketsConstUtil';

export const useTicketsList = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const allTickets = useSelector(selectSortedTickets);
  const visibleTickets = useSelector(selectVisibleTickets);
  const filteredTickets = useSelector(selectFilteredTickets);
  const isLoadingMore = useSelector((state) => state.tickets.isLoadingMore);

  const handleShowMore = useCallback(() => {
    dispatch(setLoadingMore(true));
    setTimeout(() => {
      dispatch(increaseVisibleCount());
      dispatch(setLoadingMore(false));
    }, LOADING_DELAY);
  }, [dispatch]);

  return {
    error,
    allTickets,
    visibleTickets,
    filteredTickets,
    isLoadingMore,
    handleShowMore,
  };
};
