import { Box } from '@suid/material';
import { type Component, type JSX } from 'solid-js';

const FormContainer: Component<JSX.FormHTMLAttributes<HTMLFormElement>> = (
  props
) => (
  <Box
    {...props}
    component="form"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      padding: 2,
      maxWidth: 242,
    }}
  />
);

export default FormContainer;
