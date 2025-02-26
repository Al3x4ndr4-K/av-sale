import { fetchSearchId, fetchTickets } from '../../store/tickets/tickets.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card.jsx';

export default function TicketLoader() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);

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
    return <p>Загрузка...</p>;
  }

  if (loading === 'failed') {
    return <p>Ошибка: {error}</p>;
  }

  if (!tickets || tickets.length === 0) {
    return <p>Нет доступных билетов</p>;
  }

  return (
    <div>
      <div>
        {tickets.map((ticket, index) => (
          <Card key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
