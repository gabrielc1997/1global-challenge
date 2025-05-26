import { Button, ButtonProps } from '@mui/material';

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 3, py: 1.5 }}
      {...props}
    />
  );
}