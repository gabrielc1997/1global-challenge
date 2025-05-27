import { useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  backOfficeUserSchema,
  BackOfficeUserFormData,
} from '@/features/BackOfficeUsers/validation';
import { useBackOfficeUserById, useCreateBackOfficeUser, useUpdateBackOfficeUser } from '@/features/BackOfficeUsers/useBackOfficeUser';

type Props = {
  userId: number | null;
  onClose: () => void;
};

export default function BackOfficeUserFormPanel({ userId, onClose }: Props) {
  const isEditMode = !!userId;
  const { data: user, isLoading, isError } = useBackOfficeUserById(userId);
  const updateMutation = useUpdateBackOfficeUser();
  const createMutation = useCreateBackOfficeUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BackOfficeUserFormData>({
    resolver: zodResolver(backOfficeUserSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (user && isEditMode) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
      });
    }
  }, [user, isEditMode, reset]);

  const onSubmit = async (data: BackOfficeUserFormData) => {
    if (isEditMode && userId) {
      await updateMutation.mutateAsync({ id: userId, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onClose();
  };

  if (isEditMode && isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEditMode && isError) {
    return (
      <Box p={4}>
        <Typography color="error">Failed to load user data.</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} p={4}>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          {...register('first_name')}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
        />
        <TextField
          label="Last Name"
          {...register('last_name')}
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
        />
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Avatar URL"
          {...register('avatar')}
          error={!!errors.avatar}
          helperText={errors.avatar?.message}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditMode ? 'Save' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}