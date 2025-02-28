import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { LOADING_DELAY } from '../../utils/constants/ticketsConstUtil';
import { useTicketsLoading } from '../../hooks/useTicketsLoading';
import {
  selectError,
  selectSortedTickets,
  selectVisibleTickets,
  selectFilteredTickets,
} from '../../store/selectors/selectors';
import { increaseVisibleCount, setLoadingMore } from '../../store/tickets/tickets.slice';
import Card from '../Card/Card';
import cardList from './CardList.module.scss';

export default function CardList() {
  const dispatch = useDispatch();

  useTicketsLoading();

  const error = useSelector(selectError);
  const allTickets = useSelector(selectSortedTickets);
  const visibleTickets = useSelector(selectVisibleTickets);
  const filteredTickets = useSelector(selectFilteredTickets);
  const isLoadingMore = useSelector((state) => state.tickets.isLoadingMore);

  const showMore = () => {
    dispatch(setLoadingMore(true));
    setTimeout(() => {
      dispatch(increaseVisibleCount());
      dispatch(setLoadingMore(false));
    }, LOADING_DELAY);
  };

  if (error) {
    return <p className={cardList.text}>Ошибка: {error}</p>;
  }

  if (!filteredTickets || filteredTickets.length === 0) {
    return <p className={cardList.text}>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  return (
    <>
      <div className={cardList.listContainer}>
        {visibleTickets.map((ticket, index) => (
          <div key={index}>
            {isLoadingMore && index >= visibleTickets.length - 5 ? (
              <div className={cardList.loader}>
                <CircularProgress />
              </div>
            ) : (
              <Card ticket={ticket} />
            )}
          </div>
        ))}
      </div>

      {allTickets.length > visibleTickets.length && (
        <button onClick={showMore} className={cardList.loadMoreButton} disabled={isLoadingMore}>
          {isLoadingMore ? 'Загрузка...' : 'Показать ещё билеты'}
        </button>
      )}
    </>
  );
}
