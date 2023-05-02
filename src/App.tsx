import type { Component } from "solid-js";
import ReloadPrompt from "./ReloadPrompt";
import { Routes, Route } from "@solidjs/router";

import { Box } from "@suid/material";

import Layout from "./Layout";
import LoginPage from "./pages/Login";

const App: Component = () => {
  return (
    <>
      <ReloadPrompt />
      <Routes>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={Layout}>
          <Route path="/home" element={<Box>Home</Box>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
