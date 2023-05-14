import { Route, Routes } from '@solidjs/router';
import { Box } from '@suid/material';
import type { Component } from 'solid-js';

import Layout from './Layout';
import LoginPage, { CreateAccountForm, LoginForm } from './pages/Login';
import ReloadPrompt from './ReloadPrompt';

const App: Component = () => (
  <>
    <ReloadPrompt />
    <Routes>
      <Route path="/" component={LoginPage}>
        <Route path="/login" component={LoginForm} />
        <Route path="/create-account" component={CreateAccountForm} />
      </Route>
      <Route path="/" component={Layout}>
        <Route path="/" element={<Box>Home</Box>} />
      </Route>
    </Routes>
  </>
);

export default App;
