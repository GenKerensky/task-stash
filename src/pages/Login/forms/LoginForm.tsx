import { A } from "@solidjs/router";
import { Key, Mail } from "@suid/icons-material";
import { Box, Button, TextField, Typography } from "@suid/material";

import FormContainer from "../components/FormContainer";
import TopBar from "../components/TopBar";

const LoginForm = () => {
  return (
    <div>
      <TopBar title="Login" />
      <FormContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Mail />
          <TextField required label="Email" variant="standard" />
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
          component={A}
          variant="contained"
          color="secondary"
          href="/create-account"
        >
          Create an Account
        </Button>
      </FormContainer>
    </div>
  );
};

export default LoginForm;
