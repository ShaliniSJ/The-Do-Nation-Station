import * as React from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, FormLabel, Input } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../assets/the-do-nation-station-high-resolution-logo.png";
import { signIn } from "../lib/appwrite.js";

const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const { session, is_donor } = await signIn(
        data.get("email"),
        data.get("password")
      );
      localStorage.setItem("token", session); // Store the token in localStorage
      // the is_donar is boolean value, if 1 donar else organisation redirect it such that
      if(is_donor)router.push("/index"); // Redirect to homepage after successful sign-in
      else router.push("/orgdetails");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <img
            src={backgroundImage.src}
            alt="background"
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  sx={{ mt: 1, mb: 2 }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  sx={{ mt: 1, mb: 2 }}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <div className="flex justify-center">
                <div className="font-normal">New User?</div>
                <a href="/signup" className="font-semibold text-blue-100">
                  {" "}
                  Sign Up
                </a>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
