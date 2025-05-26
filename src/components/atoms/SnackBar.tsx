import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  duration?: number;
}

export default function SnackbarAlert({
  open,
  onClose,
  message,
  severity = 'error',
  duration = 4000,
}: SnackbarAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}