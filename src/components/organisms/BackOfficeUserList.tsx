import {
  Avatar,
  Box,
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useBackOfficeUsers } from "@/features/BackOfficeUsers/hooks";

type Props = {
  itemsPerPage: number;
};

const BackOfficeUserList = ({ itemsPerPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useBackOfficeUsers(currentPage, itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">Error loading users.</Typography>;

  const totalPages = Math.ceil(data.total / itemsPerPage);

  return (
    <>
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
            {data.data.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar alt={user.email} src={user.avatar} />
                </TableCell>
                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" aria-label="Edit user">
                    <Edit />
                  </IconButton>
                  <IconButton color="error" aria-label="Delete user">
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
    </>
  );
};

export default BackOfficeUserList;