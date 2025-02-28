import { memo } from 'react';
import styles from './LoadMoreButton.module.scss';

const LoadMoreButton = memo(function LoadMoreButton({ onClick, isLoading }) {
  return (
    <button onClick={onClick} className={styles.loadMoreButton} disabled={isLoading}>
      {isLoading ? 'Загрузка...' : 'Показать ещё 5 билетов!'}
    </button>
  );
});

export default LoadMoreButton;
