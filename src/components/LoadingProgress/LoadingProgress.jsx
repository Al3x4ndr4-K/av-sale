import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import styles from './LoadingProgress.module.scss';
import { selectLoadingProgress } from '../../store/selectors/complexSelectors';

export default function LoadingProgress() {
  const progress = useSelector(selectLoadingProgress);

  return (
    <div className={styles.progressWrapper}>
      <LinearProgress variant="determinate" value={progress} className={styles.progress} sx={{ height: '0.5rem' }} />
    </div>
  );
}
