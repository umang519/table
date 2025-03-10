"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation"; // Ensure proper handling
import axios from "axios";
import { Container, Typography, TextField, Button } from "@mui/material";

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) return notFound(); // Prevent static pre-rendering

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/accept-invitation", { token })
      .then((res) => console.log(res.data.message))
      .catch(() => {
        setMessage("Token expired or invalid.");
        setValidToken(false);
      });
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
      setTimeout(() => (window.location.href = "/login"), 3000);
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

// Use Suspense to wrap the component
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
