import type { Component } from "solid-js";
import {
  Box,
  Card,
  Container,
  Typography,
  TextField,
  Button,
} from "@suid/material";
import { AccountCircle, Key } from "@suid/icons-material";
import { A } from "@solidjs/router";

const LoginPage = () => {
  return (
    <Box
      as="div"
      sx={{
        minHeight: "100vh",
        background: [
          "rgb(100,222,240)",
          "radial-gradient(circle, rgba(100,222,240,1) 0%, rgba(51,34,75,1) 100%)",
        ],
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <Card
            raised
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Box>
              <Typography variant="h2">Login</Typography>
            </Box>
            <Box
              as="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <AccountCircle />
                <TextField required label="Username" variant="standard" />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Key />
                <TextField
                  required
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                />
              </Box>
              <Button variant="contained" color="primary">
                Login
              </Button>
              <Typography variant="caption" fontStyle="italic" align="center">
                Don't have an account? Create One!
              </Typography>
              <Button
                as={A}
                variant="contained"
                color="secondary"
                href="/create-account"
              >
                Create an Account
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
