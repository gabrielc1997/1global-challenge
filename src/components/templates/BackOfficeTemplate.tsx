import { Box, Typography } from '@mui/material';
import BackOfficeUserList from '@/components/organisms/BackOfficeUserList';

type Props = {
  title?: string;
};

export default function BackOfficeTemplate({ title = 'User List' }: Props) {
  return (
    <Box sx={{ p: 8 }}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        {title}
      </Typography>
      <BackOfficeUserList itemsPerPage={4} />
    </Box>
  );
}
