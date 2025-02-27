import { fetchSearchId, fetchTickets } from '../../store/tickets/tickets.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card.jsx';
import {
  selectCurrentPage,
  selectError,
  selectLoadingStatus,
  selectSortedTickets,
} from '../../store/selectors/selectors.js';
import cardList from './CardList.module.scss';
import { Pagination } from '@mui/material';
import { usePaginationHandler } from '../../utils/handlePageUtil.js';
import { calculatePageCount, paginateTickets } from '../../utils/paginationUtil.js';

export default function CardList() {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);
  const sortedTickets = useSelector(selectSortedTickets);

  const ticketsPerPage = 5;

  const currentTickets = paginateTickets(sortedTickets, currentPage, ticketsPerPage);
  const pageCount = calculatePageCount(sortedTickets, ticketsPerPage);
  const handlePageChange = usePaginationHandler();

  useEffect(() => {
    dispatch(fetchSearchId())
      .unwrap()
      .then((searchId) => {
        dispatch(fetchTickets(searchId));
      })
      .catch((err) => {
        console.error('Ошибка при получении данных:', err);
      });
  }, [dispatch]);

  if (loading === 'loading') {
    return <p className={cardList.text}>Загрузка...</p>;
  }
  if (loading === 'failed') {
    return <p className={cardList.text}>Ошибка: {error}</p>;
  }
  if (!sortedTickets || sortedTickets.length === 0) {
    return <p className={cardList.text}>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  return (
    <>
      <div className={cardList.listContainer}>
        {currentTickets.map((ticket, index) => (
          <Card key={index} ticket={ticket} />
        ))}
      </div>

      <div className={cardList.pagination}>
        <Pagination count={pageCount} page={currentPage} onChange={(event, page) => handlePageChange(page)} />
      </div>
    </>
  );
}
