import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSearchId, fetchTickets } from '../store/tickets/tickets.slice';
import { FETCH_DELAY } from '../utils/constants/ticketsConstUtil';

export const useTicketsLoading = () => {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.tickets.searchId);
  const hasMore = useSelector((state) => state.tickets.hasMore);
  const ticketsCount = useSelector((state) => state.tickets.tickets.length);

  useEffect(() => {
    if (!searchId) {
      dispatch(fetchSearchId())
        .unwrap()
        .then((id) => {
          if (id) {
            dispatch(fetchTickets(id));
          }
        });
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    let timeoutId;

    if (hasMore && searchId) {
      timeoutId = setTimeout(() => {
        dispatch(fetchTickets(searchId));
      }, FETCH_DELAY);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hasMore, searchId, ticketsCount, dispatch]);

  return { searchId, hasMore };
};
