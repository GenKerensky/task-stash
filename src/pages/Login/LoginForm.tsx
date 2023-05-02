import { Component, createMemo } from "solid-js";
import { Box, Button, TextField, Typography } from "@suid/material";
import { AccountCircle, Key } from "@suid/icons-material";
import { A, useLocation } from "@solidjs/router";

const LoginForm = () => {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  return (
    <>
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
          href={`${pathname()}/create-account`}
        >
          Create an Account
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
