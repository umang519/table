"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:5000/api/accept-invitation", { token })
        .then((res) => console.log(res.data.message))
        .catch((err) => {
          setMessage("Token expired or invalid.");
          setValidToken(false);
        });
    } else {
      setMessage("Invalid token.");
      setValidToken(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });

      setMessage(response.data.message);

      setTimeout(() => {
        router.push("/login"); 
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5" sx={{ color: "black" }} gutterBottom>
        Reset Password
      </Typography>
      {message && <Typography color="error">{message}</Typography>}
      
      {validToken && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!newPassword || !confirmPassword || loading}
            style={{ marginTop: "20px" }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}
    </Container>
  );
}
