import { Typography, Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Sidebar({ setActiveTab, setShowForm }) {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "250px",
        background: "#2c3e50",
        padding: "20px",
        color: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position:'fixed',
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", marginBottom: 2 }}
          onClick={() => {
            setActiveTab("dashboard");
            setShowForm(false);
          }}
        >
          DASHBOARD
        </Typography>

        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setActiveTab("manageUsers");
            setShowForm(false);
          }}
        >
          MANAGE USERS
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="error"
        onClick={() => {
          Cookies.remove("authToken");
          router.push("/login");
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
