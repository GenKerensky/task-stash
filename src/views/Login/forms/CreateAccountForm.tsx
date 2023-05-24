import { createForm } from '@felte/solid';
import { validateSchema } from '@felte/validator-zod';
import { useNavigate } from '@solidjs/router';
import { ArrowBack, Key, Mail } from '@suid/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  TextField,
  Typography,
} from '@suid/material';
import { type Component, createSignal, For } from 'solid-js';
import { z } from 'zod';
import zxcvbn, { type ZXCVBNResult } from 'zxcvbn';

import { createAccount } from '../../../controllers/createAccount';
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

const createAccountFormSchema = z.object({
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
      (password) => {
        const message = zxcvbn(password).feedback.warning;
        return {
          message: message || 'Password is too weak!',
        };
      }
    ),
});

const CreateAccountForm: Component = () => {
  const [loading, setLoading] = createSignal(false);
  const navigator = useNavigate();

  const { form, data, errors, isValid } = createForm<
    z.infer<typeof createAccountFormSchema>
  >({
    validate: validateSchema(createAccountFormSchema),
    debounced: {
      validateTimeout: 250,
    },
    onSubmit: async (values) => {
      setLoading(true);
      await createAccount(values.email, values.password);
      setLoading(false);
      navigator('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: async (response, context) => {
      setLoading(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: async (err, context) => {
      setLoading(false);
    },
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
              helperText={errors().email?.[0]}
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
              helperText={errors().password?.[0]}
              variant="standard"
            />
          </Box>
          <Typography>
            Password Strength:{' '}
            <LinearProgress
              variant="determinate"
              color={passwordComplexityColor()}
              value={passwordComplexityScore()}
            />
          </Typography>
          <List>
            <For each={passwordComplexity()?.feedback.suggestions}>
              {(suggestion) => (
                <ListItem disableGutters disablePadding>
                  <Typography variant="caption" fontStyle="italic">
                    {suggestion}
                  </Typography>
                </ListItem>
              )}
            </For>
          </List>
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
              'Create Account'
            )}
          </Button>
        </FormContainer>
      </Box>
    </>
  );
};

export default CreateAccountForm;
