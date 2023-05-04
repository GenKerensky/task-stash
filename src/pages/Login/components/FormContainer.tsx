import { JSX } from "solid-js";
import { Box } from "@suid/material";

const FormContainer = (props: JSX.FormHTMLAttributes<HTMLDivElement>) => (
  <Box
    as="form"
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 2,
    }}
  />
);

export default FormContainer;
