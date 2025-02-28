import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';

export default function LoadingNotification() {
  const [open, setOpen] = useState(false);
  const hasMore = useSelector((state) => state.tickets.hasMore);

  useEffect(() => {
    if (!hasMore) {
      setOpen(true);
    }
  }, [hasMore]);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        marginTop: '0.5rem',
        marginRight: '0.5rem',
      }}
    >
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Все билеты успешно загружены!
      </Alert>
    </Snackbar>
  );
}
