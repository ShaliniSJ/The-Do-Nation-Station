import * as React from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, FormLabel, Input, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../assets/the-do-nation-station-high-resolution-logo.png";
import { createUser } from "../lib/appwrite.js";

const defaultTheme = createTheme();

export default function SignUp() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await createUser(
        data.get("email"),
        data.get("password"),
        data.get("username"),
        data.get("userType")
      );
      localStorage.setItem("islogged", true);
      if(data.get("userType") === "Donor"){
        router.push("/");
      } else {
        router.push("/orgdetails");
      }
      // router.push("/signin"); // Redirect to sign-in page after successful sign-up
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

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
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel>User Name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  required
                  sx={{ mt: 1, mb: 2 }}
                />
              </FormControl>

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

              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel>User Type</FormLabel>
                <Select
                  name="userType"
                  defaultValue=""
                  required
                  sx={{ mt: 1, mb: 2 }}
                >
                  <MenuItem value="Donor">Donor</MenuItem>
                  <MenuItem value="Organisation">Organisation</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <div className="flex justify-center">
                <div className="font-normal">Not New?</div>
                <a href="/signin" className="font-semibold text-blue-100"> Sign In</a>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}