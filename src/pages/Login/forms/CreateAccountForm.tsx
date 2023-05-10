import { createForm } from '@felte/solid';
import { validateSchema } from '@felte/validator-zod';
import { useNavigate } from '@solidjs/router';
import { ArrowBack, Key, Mail } from '@suid/icons-material';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from '@suid/material';
import { type Component, createEffect } from 'solid-js';
import { z } from 'zod';
import zxcvbn, { type ZXCVBNResult } from 'zxcvbn';

import FormContainer from '../components/FormContainer';
import TopBar from '../components/TopBar';

const BackButton: Component = () => {
  const navigation = useNavigate();

  return (
    <IconButton
      onClick={() => {
        navigation('/login');
      }}
    >
      <ArrowBack />
    </IconButton>
  );
};

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required!' })
    .email({ message: 'Must be a valid email address!' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required!' })
    .refine(
      (password) => {
        const result = zxcvbn(password);
        return result.score >= 3;
      },
      (password) => ({ message: zxcvbn(password).feedback.warning })
    ),
});

const CreateAccountForm: Component = () => {
  const { form, data, errors, isValid } = createForm<z.infer<typeof schema>>({
    validate: validateSchema(schema),
    debounced: {
      validateTimeout: 250,
    },
  });

  createEffect(() => {
    console.log(data());
    console.log(errors());
  });

  const passwordComplexity = (): ZXCVBNResult | undefined =>
    data(($data) => {
      if ($data.password?.length > 0) {
        return zxcvbn($data.password);
      }
    });

  const passwordComplexityScore = (): number => {
    const score = passwordComplexity()?.score ?? 0;
    return (score / 4) * 100;
  };

  const passwordComplexityColor = ():
  | 'success'
  | 'primary'
  | 'warning'
  | 'error' =>
    passwordComplexityScore() >= 75
      ? 'success'
      : passwordComplexityScore() >= 50 || data((d) => d.password?.length) === 0
        ? 'primary'
        : passwordComplexityScore() >= 25
          ? 'warning'
          : 'error';

  const passwordSuggestions = (): string[] | undefined =>
    passwordComplexity()?.feedback.suggestions;

  return (
    <>
      <TopBar title="Create Account" leftButton={<BackButton />} />
      <Box>
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
              name="email"
              label="Email"
              required
              type="email"
              error={errors().email !== null}
              helperText={errors().email}
              variant="standard"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Key />
            <TextField
              name="password"
              label="Password"
              required
              type="password"
              autoComplete="current-password"
              error={errors().password !== null}
              helperText={errors().password}
              variant="standard"
            />
          </Box>
          <Typography>
            Password Strength: <LinearProgress            
              variant="determinate"
              color={passwordComplexityColor()}
              value={passwordComplexityScore()}
            />
          </Typography>          
          <Typography variant="caption" fontStyle="italic" flexWrap="wrap">
            {passwordSuggestions()}
          </Typography>
          <Button
            disabled={!isValid()}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create Account
          </Button>
        </FormContainer>
      </Box>
    </>
  );
};

export default CreateAccountForm;
