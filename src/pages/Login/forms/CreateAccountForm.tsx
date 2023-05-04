import { useNavigate } from "@solidjs/router";
import { ArrowBack, Key, Mail } from "@suid/icons-material";
import { Box, Button, IconButton, TextField } from "@suid/material";

import FormContainer from "../components/FormContainer";
import TopBar from "../components/TopBar";

const BackButton = () => {
  const navigation = useNavigate();

  return (
    <IconButton onClick={() => navigation("/login")}>
      <ArrowBack />
    </IconButton>
  );
};

const CreateAccountForm = () => {
  return (
    <div>
      <TopBar title="Create Account" leftButton={<BackButton />} />
      <Box>
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
            Create Account
          </Button>
        </FormContainer>
      </Box>
    </div>
  );
};

export default CreateAccountForm;
