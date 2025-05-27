import { useState } from "react";
import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import BackOfficeUserList from "@/components/organisms/BackOfficeUserList";
import BackOfficeUserFormPanel from "@/components/organisms/BackOfficeUserFormPanel";

export default function BackOfficeTemplate() {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (id: number) => {
    setEditingUserId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingUserId(null);
    setOpen(false);
  };
    const handleRegister = () => {
    setEditingUserId(null);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <BackOfficeUserList
        itemsPerPage={6}
        onEdit={(id) => handleEdit(id)}
        onAdd={() => handleRegister()}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
          <BackOfficeUserFormPanel
            userId={editingUserId}
            onClose={handleClose}
          />
      </Dialog>
    </Box>
  );
}
