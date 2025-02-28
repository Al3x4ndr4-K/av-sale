import { memo, useMemo } from 'react';
import { CircularProgress } from '@mui/material';

import { useTicketsLoading } from '../../hooks/useTicketsLoading';
import { useTicketsList } from '../../hooks/useTicketsList';
import Card from '../Card/Card';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import cardList from './CardList.module.scss';

const CardList = memo(function CardList() {
  useTicketsLoading();

  const { error, allTickets, visibleTickets, filteredTickets, isLoadingMore, handleShowMore } = useTicketsList();

  const renderedTickets = useMemo(() => {
    return visibleTickets.map((ticket, index) => (
      <div key={`${ticket.carrier}-${index}`}>
        {isLoadingMore && index >= visibleTickets.length - 5 ? (
          <div className={cardList.loader}>
            <CircularProgress />
          </div>
        ) : (
          <Card ticket={ticket} />
        )}
      </div>
    ));
  }, [visibleTickets, isLoadingMore]);

  if (error) {
    return <MessageDisplay message={`Ошибка: ${error}`} />;
  }

  if (!filteredTickets?.length) {
    return <MessageDisplay message="Рейсов, подходящих под заданные фильтры, не найдено" />;
  }

  return (
    <>
      <div className={cardList.listContainer}>{renderedTickets}</div>

      {allTickets.length > visibleTickets.length && (
        <LoadMoreButton onClick={handleShowMore} isLoading={isLoadingMore} />
      )}
    </>
  );
});

export default CardList;
