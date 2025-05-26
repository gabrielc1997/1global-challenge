import { Typography } from '@mui/material';

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h1" fontWeight={600} color="primary" sx={{ mb: 4 }}>
      {children}
    </Typography>
  );
}