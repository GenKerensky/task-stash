import { createForm } from '@felte/solid';
import { validateSchema } from '@felte/validator-zod';
import { A, useNavigate } from '@solidjs/router';
import { Key, Mail } from '@suid/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@suid/material';
import { type Component, createSignal } from 'solid-js';
import { z } from 'zod';

import { login } from '../../../controllers/login';
import FormContainer from '../components/FormContainer';
import TopBar from '../components/TopBar';

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required!' })
    .email({ message: 'Must be a valid email address!' }),
  password: z.string().nonempty({ message: 'Password is required!' }),
});

const LoginForm: Component = () => {
  const [loading, setLoading] = createSignal(false);
  const [loginError, setLoginError] = createSignal<string>();
  const navigator = useNavigate();

  const { form, data, errors, isValid } = createForm<
    z.infer<typeof loginFormSchema>
  >({
    validate: validateSchema(loginFormSchema),
    debounced: {
      validateTimeout: 250,
    },
    onSubmit: async ({ email, password }) => {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      navigator('/');
    },
    onSuccess: async (response, context) => {
      setLoading(false);
    },
    onError: async (err, context) => {
      setLoginError((err as Error).message);
      setLoading(false);
    },
  });

  return (
    <>
      <TopBar title="Login" />
      <FormContainer ref={form}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Mail />
          <TextField
            required
            label="Email"
            name="email"
            error={errors().email !== null}
            helperText={errors().email?.[0]}
            variant="standard"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Key />
          <TextField
            required
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            error={errors().password !== null}
            helperText={errors().password?.[0]}
            variant="standard"
          />
        </Box>
        <Button
          disabled={!isValid()}
          variant="contained"
          color="primary"
          type="submit"
        >
          {loading() ? (
            <>
              <CircularProgress size={24} sx={{ color: 'white' }} />
              Creating account...
            </>
          ) : (
            'Login'
          )}
        </Button>
        {loginError() ? (
          <Typography
            color="red"
            fontStyle="italic"
            fontSize={11}
            textAlign="center"
          >
            Error: {loginError()}
          </Typography>
        ) : null}
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
};

export default LoginForm;
