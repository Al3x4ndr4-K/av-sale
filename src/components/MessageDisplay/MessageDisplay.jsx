import { memo } from 'react';
import styles from './MessageDisplay.module.scss';

const MessageDisplay = memo(function MessageDisplay({ message }) {
  return <p className={styles.text}>{message}</p>;
});

export default MessageDisplay;
