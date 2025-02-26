"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Person, Email, Lock } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signup.module.css"; // Make sure you have a CSS file for styling

export default function Signup() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(10, "Password must be at least 10 characters long")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // React Hook Form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Submit form
  const onSubmit = async (data) => {
    console.log("Sign up data:", data);

    
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
     
      router.push("/login");
    } else {
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className={styles.inputContainer}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Email */}
          <div className={styles.inputContainer}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Password */}
          <div className={styles.inputContainer}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Confirm Password */}
          <div className={styles.inputContainer}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
            />
          </div>

          {/* Error Message */}
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          {/* Sign Up Button */}
          <Button variant="contained" type="submit" fullWidth>
            Sign Up
          </Button>

          {/* Link to Login */}
          <p className={styles.loginLink}>
            Already have an account?{" "}
            <span
              className={styles.link}
              onClick={() => router.push("/login")}
            >Login
            </span> here
          </p>
        </form>
      </div>
    </div>
  );
}
