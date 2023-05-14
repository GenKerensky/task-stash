import { A } from '@solidjs/router';
import { Key, Mail } from '@suid/icons-material';
import { Box, Button, TextField, Typography } from '@suid/material';
import { type Component } from 'solid-js';

import FormContainer from '../components/FormContainer';
import TopBar from '../components/TopBar';

const LoginForm: Component = () => (
  <>
    <TopBar title="Login" />
    <FormContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Mail />
        <TextField required label="Email" variant="standard" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
      <Button
        component={A}
        variant="contained"
        color="secondary"
        href="/create-account"
      >
        Create an Account
      </Button>
      <Typography variant="caption" fontStyle="italic" align="center">
        Don&quot;t have an account? Create One!
      </Typography>
    </FormContainer>
  </>
);

export default LoginForm;
