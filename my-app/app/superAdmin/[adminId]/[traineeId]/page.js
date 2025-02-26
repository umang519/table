"use client";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import {
  useGetUsersByTraineeQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/app/redux/userApi";

export default function UserPage() {
  const { traineeId } = useParams();
  const searchParams = useSearchParams();
  const traineeName = searchParams.get("traineeName") || "Loading...";

  // Fetch users from API
  const { data, error, isLoading } = useGetUsersByTraineeQuery(traineeId);

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Mutation to add user
  const [addUser] = useAddUserMutation();

  // State for add user dialog
  const [openAdd, setOpenAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State for update user dialog
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // State for delete confirmation
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Open / Close Add User Dialog
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewUser({ username: "", email: "", password: "" });
  };

  // Handle Add User Input Change
  const handleChangeAdd = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle Add User Submit
  const handleSubmitAdd = async () => {
    try {
      await addUser({ traineeId, ...newUser }).unwrap();
      console.log("User added successfully");
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Open Update User Dialog
  const handleOpenUpdate = (user) => {
    setSelectedUser(user);
    setOpenUpdate(true);
  };

  // Close Update User Dialog
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedUser(null);
  };

  // Handle Update Input Change
  const handleChangeUpdate = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  // Handle Update Submit (Only Frontend)
  const handleSubmitUpdate = async () => {
    try {
      await updateUser({ userId: selectedUser._id, updatedData: selectedUser }).unwrap();
      console.log("User updated successfully");
      handleCloseUpdate();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Open Delete Confirmation Dialog
  const handleOpenDelete = (userId) => {
    setDeleteUserId(userId);
    setOpenDelete(true);
  };

  // Close Delete Confirmation Dialog
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteUserId(null);
  };

  // Handle Delete Submit (Only Frontend)
  const handleSubmitDelete = async () => {
    try {
      await deleteUser(deleteUserId).unwrap();
      console.log("User deleted successfully");
      handleCloseDelete();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (isLoading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">Error fetching users</Typography>;

  return (
    <Container>
      <Typography variant="h4" sx={{ color: "black" }} gutterBottom>
        Users under this : {traineeName}
      </Typography>

      {/* Add User Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpenAdd}
      >
        Add User
      </Button>

      {/* Add User Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={newUser.username}
            onChange={handleChangeAdd}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleChangeAdd}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChangeAdd}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAdd} color="primary" variant="contained">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update User Dialog */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={selectedUser?.username || ""}
            onChange={handleChangeUpdate}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={selectedUser?.email || ""}
            onChange={handleChangeUpdate}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={selectedUser?.password || ""}
            onChange={handleChangeUpdate}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitUpdate}
            color="primary"
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenUpdate(user)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDelete(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
