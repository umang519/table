"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./page.module.css";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Yup validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login response:", data);
          Cookies.set("authToken", data.token, { expires: 7 }); 
          Cookies.set("userRole", data.user.role, { expires: 7 });
          Cookies.set("userId", data.user._id, { expires: 7 });
          Cookies.set("email", data.user.email, { expires: 7 });
          Cookies.set("username", data.user.username, { expires: 7});
          Cookies.set("password", data.user.password, {expires: 7});

          // Store user ID
          if (data.user.role === "admin") {
            Cookies.set("adminId", data.user.adminId, { expires: 7 }); 
          }

          if (data.user.role === "superadmin") {
            router.push("/superAdmin");
          } else if (data.user.role === "admin") {
            router.push(`/admin/${data.user.id}?adminName=${encodeURIComponent(data.user.username)}`);
          }
          else if (data.user.role === "trainee") {
            if (data.user.id) {  
              router.push(`/trainee/${data.user.id}?traineeName=${encodeURIComponent(data.user.username)}`);
            } else {
              console.error("Trainee ID is missing:", data.user);
              setErrorMessage("Error: Trainee ID not found.");
            }
          }
          
           else {
            router.push("/userHomePage");
          }
        } else {
          if (data.message === "Please check your email and reset your password before logging in.") {
            setErrorMessage("Your password has not been set. Please check your email and reset your password.");
          } else {
            setErrorMessage(data.message || "Invalid Credentials");
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className={styles.page}>
      {/* <h1 className={styles.title}>Login</h1> */}
      <div className={styles.container}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/011/432/528/small/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-vector.jpg"
          className={styles.image}
          alt="Login Illustration"
        />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className={styles.inputContainer}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className={styles.inputContainer}>
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <p
            className={styles.forgotPassword}
            onClick={() => router.push("/forgot-password")}
          >
            Forget Password?
          </p>


          {/* Error Message */}
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          {/* Login Button */}
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>

          <p className={styles.signupLink}>
            Don't have an account?{" "}
            <span
              className={styles.link}
              onClick={() => router.push("/signup")}
            >
              SignUp
            </span>{" "}
            here
          </p>
        </form>
      </div>
    </div>
  );
}
