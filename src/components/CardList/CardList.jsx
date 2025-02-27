import { fetchSearchId, fetchTickets } from '../../store/tickets/tickets.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card.jsx';
import { selectError, selectFilteredTickets, selectLoadingStatus } from '../../store/selectors/selectors.js';
import cardList from './CardList.module.scss';

export default function CardList() {
  const dispatch = useDispatch();

  const filteredTickets = useSelector(selectFilteredTickets);
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);

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
  if (!filteredTickets || filteredTickets.length === 0) {
    return <p className={cardList.text}>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  return (
    <div>
      <div>
        {filteredTickets.map((ticket, index) => (
          <Card key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
