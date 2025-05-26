import { TextField, TextFieldProps } from '@mui/material';

export default function Input(props: TextFieldProps) {
  return (
    <TextField
      fullWidth
      margin="none"
      sx={{
        mt: 2,
        mb:2,

        '& .MuiInputLabel-root': {
          color: 'text.primary',
          fontSize: '0.875rem',
          lineHeight: '20px',
        },
        '& .MuiInputBase-input': {
          color: 'text.primary',
          fontSize: '1rem',
          lineHeight: '24px',
          padding: '12px 16px',
          height: '48px',
          boxSizing: 'border-box',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
        },
      }}
      {...props}
    />
  );
}