import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import Title from "@/components/atoms/Title";
import { Edit, Delete, RestartAlt, Add } from "@mui/icons-material";
import { useState } from "react";

import { BackOfficeUser } from "@/features/BackOfficeUsers/types";
import {
  useBackOfficeUsers,
  useDeleteBackOfficeUser,
} from "@/features/BackOfficeUsers/useBackOfficeUser";

type Props = {
  itemsPerPage: number;
  onEdit: (id: number) => void;
  onAdd: () => void;
};

const STORAGE_KEY = "backoffice_users";

const BackOfficeUserList = ({ itemsPerPage, onEdit, onAdd }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useBackOfficeUsers(
    currentPage,
    itemsPerPage
  );
  const deleteMutation = useDeleteBackOfficeUser();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<BackOfficeUser | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleRequestDelete = (user: BackOfficeUser) => {
    setUserToDelete(user);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteMutation.mutateAsync(userToDelete.id);
        setSnackbarMessage("User deleted successfully.");
        setSnackbarSeverity("success");
      } catch {
        setSnackbarMessage("Failed to delete user.");
        setSnackbarSeverity("error");
      } finally {
        setUserToDelete(null);
        setConfirmDialogOpen(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    refetch();
    setSnackbarMessage("User list reset successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  if (isLoading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="text" width={120} height={32} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="rectangular" width={120} height={36} />
            <Skeleton variant="rectangular" width={120} height={36} />
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(itemsPerPage)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="circular" width={40} height={40} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="90%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="rectangular" width={80} height={30} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Skeleton variant="rectangular" width={200} height={40} />
        </Box>
      </>
    );
  }

  if (error || !data)
    return <Typography color="error">Error loading users.</Typography>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Title>User list</Title>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RestartAlt />}
            onClick={handleReset}
          >
            Reset Users
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={onAdd}
            data-testid="add"
          >
            Add User
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((user: BackOfficeUser) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar alt={user.email} src={user.avatar} />
                </TableCell>
                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" data-testid="edit" onClick={() => onEdit(user.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleRequestDelete(user)}
                    data-testid="delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>
              {userToDelete?.first_name} {userToDelete?.last_name}
            </strong>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} data-testid="confirm" color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BackOfficeUserList;
