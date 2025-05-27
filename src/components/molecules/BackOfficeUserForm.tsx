import { Box, Button, TextField } from "@mui/material";
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { BackOfficeUserFormData } from "@/features/BackOfficeUsers/validation";

type Props = {
  register: UseFormRegister<BackOfficeUserFormData>;
  errors: FieldErrors<BackOfficeUserFormData>;
  handleSubmit: UseFormHandleSubmit<BackOfficeUserFormData>;
  onSubmit: (data: BackOfficeUserFormData) => void;
  isSubmitting: boolean;
  isEditMode: boolean;
  onCancel: () => void;
};

export default function BackOfficeUserForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
  isEditMode,
  onCancel,
}: Props) {
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="First Name"
        fullWidth
        margin="normal"
        {...register("first_name")}
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
      />

      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        {...register("last_name")}
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Avatar URL"
        fullWidth
        margin="normal"
        {...register("avatar")}
        error={!!errors.avatar}
        helperText={errors.avatar?.message}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
}