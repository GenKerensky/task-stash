import type { Component } from "solid-js";
import ReloadPrompt from "./ReloadPrompt";
import { Routes, Route } from "@solidjs/router";

import { Box } from "@suid/material";

import Layout from "./Layout";
import LoginPage, { CreateAccountForm, LoginForm } from "./pages/Login";

const App: Component = () => {
  return (
    <>
      <ReloadPrompt />
      <Routes>
        <Route path="/login" component={LoginPage}>
          <Route path="/" component={LoginForm} />
          <Route path="/create-account" component={CreateAccountForm} />
        </Route>
        <Route path="/" component={Layout}>
          <Route path="/home" element={<Box>Home</Box>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
