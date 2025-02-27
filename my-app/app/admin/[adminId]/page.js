"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  useGetTraineesQuery,
  useAddTraineeMutation,
  useUpdateTraineeMutation,
  useDeleteTraineeMutation,
} from "@/app/redux/traineeApi";
import Cookies from "js-cookie";

export default function AdminTraineesPage() {
  const { adminId } = useParams();
  console.log(adminId);
  const searchParams = useSearchParams();
  const router = useRouter();
  const adminName = searchParams.get("adminName") || "Loading...";

  const { data, error, isLoading } = useGetTraineesQuery(adminId);
  console.log("Fetching trainees for admin:", adminId);

  const [addTrainee] = useAddTraineeMutation();
  const [updateTrainee] = useUpdateTraineeMutation();
  const [deleteTrainee] = useDeleteTraineeMutation();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTraineeId, setSelectedTraineeId] = useState(null);
  const [traineeData, setTraineeData] = useState({
    username: "",
    email: "",
    password: "",
    status: "active",
    role: "trainee",
  });

  const handleOpen = (trainee = null) => {
    if (trainee) {
      setEditMode(true);
      setSelectedTraineeId(trainee._id);
      setTraineeData({
        username: trainee.username,
        email: trainee.email,
        password: trainee.password,
        status: trainee.status,
      });
    } else {
      setEditMode(false);
      setTraineeData({ username: "", email: "", password: "", status: "active", role: "trainee" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedTraineeId(null);
  };

  const handleChange = (e) => {
    setTraineeData({ ...traineeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await updateTrainee({ id: selectedTraineeId, ...traineeData }).unwrap();
      } else {
        await addTrainee({ ...traineeData, adminId }).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error("Error saving trainee:", error);
      alert("Failed to save trainee");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this trainee?")) {
      try {
        await deleteTrainee(id).unwrap();
      } catch (error) {
        console.error("Error deleting trainee:", error);
        alert("Failed to delete trainee");
      }
    }
  };

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
      <Typography variant="h4" sx={{ color: "black" }} gutterBottom>
        Trainees under: {adminName}
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpen()}>
        Add Trainee
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>Error fetching trainees</TableCell>
              </TableRow>
            ) : (
              data?.trainees.map((trainee) => (
                <TableRow key={trainee._id} onClick={() =>
                  router.push(
                    `/trainee/${trainee._id}?traineeName=${encodeURIComponent(
                      trainee.username
                    )}`
                  )
                }>
                  <TableCell>{trainee.username}</TableCell>
                  <TableCell>{trainee.email}</TableCell>
                  <TableCell>{trainee.password}</TableCell>
                  <TableCell>{trainee.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={(e) => {
                      e.stopPropagation();
                      handleOpen(trainee)}}>
                      Update
                    </Button>
                    <Button variant="contained" color="error" onClick={(e) =>{
                      e.stopPropagation();
                      handleDelete(trainee._id)}} sx={{ ml: 1 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Trainee" : "Add New Trainee"}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Username" name="username" fullWidth variant="outlined" value={traineeData.username} onChange={handleChange} />
          <TextField margin="dense" label="Email" name="email" fullWidth variant="outlined" value={traineeData.email} onChange={handleChange} />
          <TextField margin="dense" label="Password" name="password" type="password" fullWidth variant="outlined" value={traineeData.password} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <div><Button variant="contained" sx= {{ mt : 2 }} onClick={handleLogout}> logout </Button></div>

    </Container>
  );
}
