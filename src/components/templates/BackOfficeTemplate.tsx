import { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import BackOfficeUserList from "@/components/organisms/BackOfficeUserList";
import BackOfficeUserFormPanel from "@/components/organisms/BackOfficeUserFormPanel";
import ThemeToggleButton from "@/components/atoms/ThemeToggleButton";

export default function BackOfficeTemplate() {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (id: number) => {
    setEditingUserId(id);
    setOpen(true);
  };

  const handleRegister = () => {
    setEditingUserId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingUserId(null);
    setOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <ThemeToggleButton />
      </Box>

      <BackOfficeUserList
        itemsPerPage={6}
        onEdit={handleEdit}
        onAdd={handleRegister}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUserId ? "Edit User" : "Add New User"}
        </DialogTitle>
        <BackOfficeUserFormPanel userId={editingUserId} onClose={handleClose} />
      </Dialog>
    </Box>
  );
}
