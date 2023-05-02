import type { Component } from "solid-js";
import { Box, Card, Container } from "@suid/material";
import { Outlet } from "@solidjs/router";
import CreateAccountForm from "./CreateAccountForm";
import LoginForm from "./LoginForm";

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
            <Outlet />
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
export { LoginForm, CreateAccountForm };
