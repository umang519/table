"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAdminsQuery, useAddAdminMutation, useDeleteAdminMutation, useUpdateAdminMutation} from "../redux/adminApi";
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
import axios from "axios";
import Cookies from "js-cookie";

export default function SuperAdminPage() {
  const router = useRouter();
  const { data, error, isLoading } = useGetAdminsQuery();
  const [addAdmin, { isLoading: isAdding }] = useAddAdminMutation();

  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [adminData, setAdminData] = useState({
    username: "",
    email: "",
    password: "",
    status: "active",
    role: "admin",
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addAdmin(adminData).unwrap();
      alert("Admin added successfully!");
      setOpen(false);
      setAdminData({ username: "", email: "", password: "", status: "active", role: "admin" });
    } catch (err) {
      alert("Error adding admin: " + err.data?.message);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try{
      await updateAdmin({ id: selectedAdmin._id, ...selectedAdmin }).unwrap();
      alert("admin updated successfully!");
      setEditOpen(false);
    } catch (err) {
      alert("Error updating admin: ", err.data?.message);
    }
  }

  const handleDelete = async (id) => {
    if (confirm ("Are you sure want to delete this admin ?")) {
      try {
        await deleteAdmin(id).unwrap();
        alert("admin deleted successfully!");
      } catch (err){
        alert("Error deleting admin: " + err.data?.message);
      }
    }
  }

  const handleLogout = () => {
      // Remove authentication cookies
      Cookies.remove("authToken");
      Cookies.remove("userRole");
      Cookies.remove("userId");
      Cookies.remove("adminId");
      Cookies.remove("email");

  
      // Redirect to login page
      router.push("/login");
    };
  
    // Redirect to login if user is not authenticated
    useEffect(() => {
      const token = Cookies.get("authToken");
      if (!token) {
        router.push("/login");
      }
    }, []);

  return (
    <Container>
      <Typography variant="h4" sx= {{ color: "black"}} gutterBottom>
        Manage Admins
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Add Admin
      </Button>

      {/* Add Admin Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <TextField label="Username" name="username" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth margin="dense" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isAdding} variant="contained" color="primary">
            {isAdding ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show Loading or Error */}
      {isLoading ? <p>Loading admins...</p> : error ? <p>Error loading admins</p> : null}

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="dense"
            value={selectedAdmin?.username || ""}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, username: e.target.value })}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="dense"
            value={selectedAdmin?.email || ""}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, email: e.target.value })}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="dense"
            value={selectedAdmin?.password || ""}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Admins Table */}
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
            {data?.admins.map((admin) => (
              <TableRow
                key={admin._id}
                onClick={() => router.push(`/admin/${admin._id}?adminName=${encodeURIComponent(admin.username)}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.password}</TableCell>
                <TableCell>{admin.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(admin);
                    }} sx={{ mr: 1 }}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" onClick={(e) => {
                     e.stopPropagation();
                    handleDelete(admin._id);
                    }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button variant= "contained" sx= {{ mt : 2 }} onClick={handleLogout}>Logout</Button>
      </div>
      
    </Container>
  );
}
