"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import styles from "./page.module.css";
import { deleteCookie } from "cookies-next";

export default function Page() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(); // Loading state

  

  
  const defaultValue = 5; // Default value
  const [temp, setTemp] = useState(defaultValue);

  // Increment function
  const increment = () => {
    if (temp < 10) {
      setTemp((prevTemp) => prevTemp + 1);
    }
  };

  // Decrement function
  const decrement = () => {
    if (temp > 0) {
      setTemp((prevTemp) => prevTemp - 1);
    }
  };

  // Reset function
  const reset = () => {
    setTemp(defaultValue);
  };

  if (isAuthorized) {
    return <div>Loading...</div>; // Prevent rendering while checking for the token
  }

  return (
    <Box style={{ backgroundColor: "white", padding: "20px", textAlign: "center" }}>
      <div className={styles.container}>
        <h1 className={styles.text}>WELCOME TO THE WEBSITE!</h1>
        <Link href="#">
          <button className={styles.home}>Home</button>
        </Link>
        <Link href="/TodoList">
          <button className={styles.todo}>TodoList</button>
        </Link>
          <button className={styles.logout} onClick={() => {deleteCookie("token");
          router.replace("/");
          }}>
            Logout
          </button>
      </div>
      <Typography variant="h1" style={{ color: "black" }}>
        {temp}
      </Typography>

      <Button onClick={increment} variant="contained" style={{ marginRight: "10px" }}>
        Increment
      </Button>

      <Button onClick={decrement} variant="contained" style={{ marginRight: "10px" }}>
        Decrement
      </Button>

      <Button onClick={reset} variant="contained">
        Reset
      </Button>
    </Box>
  );
}
