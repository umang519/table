'use client';
import { useState } from "react";
import {
  Typography,
  Paper,
  Switch,
  IconButton,
  Modal,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "../redux/userApi";
import { DataGrid } from "@mui/x-data-grid";
import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from "@mui/icons-material";


export default function UserTable() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState("all");
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useGetUsersQuery(
    {
      page,
      limit: rowsPerPage,
      status: statusFilter,
      search,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [updateUserStatus] = useUpdateUserStatusMutation();
  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching users</Typography>;

  const { users, totalPages } = data;

  const filteredUsers = users.filter((user) =>
    statusFilter === "all" ? true : user.status === statusFilter
  );

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      await updateUserStatus({ id, status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            method: "DELETE",
          }
        );

        const result = await response.json();
        if (!response.ok)
          throw new Error(result.message || "Failed to delete user");

        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(error.message);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${selectedUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editFormData),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update user");

      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };
 
  const columns = [
    { field: "id", headerName: "No.", width: 70 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.row.status === "active"}
          onChange={() => handleStatusToggle(params.row._id, params.row.status)}
        />
      ),
    },
    { field: "signupMethod", headerName: "Signup Method", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = users.map((user, index) => ({
    id: (page - 1) * 5 + index + 1,
    _id: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    status: user.status || "inactive",
    signupMethod: user.signupMethod,
  }));

  return (
    <Paper sx={{ width: "80%", marginTop: 3, padding: 2, marginLeft: "250px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Typography variant="h6">User List</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by username/email"
            value={search}
            onChange={handleSearchChange}
            InputProps={{ endAdornment: <SearchIcon /> }}
            sx={{ width: 250 }}
          />
        </Box>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        hideFooter={true}
        pagination={false}
        disableSelectionOnClick
      />

      <div style={{ marginTop: 10, textAlign: "center" }}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>

        <FormControl size="small">
          <InputLabel id="rows-label">Rows</InputLabel>
          <Select
            labelId="rows-label"
            id="rows-select"
            label="rows"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/*Edit User*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: "white",
            margin: "10% auto",
            width: 400,
          }}
        >
          <Typography variant="h6">Edit User</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              value={editFormData.username}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={editFormData.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              value={editFormData.password}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </Paper>
  );
}
