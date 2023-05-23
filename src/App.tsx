import { Route, Routes } from '@solidjs/router';
import { Box, createTheme, ThemeProvider } from '@suid/material';
import type { Component } from 'solid-js';

import { Background } from './components/Background';
import ReloadPrompt from './ReloadPrompt';
import Layout from './views/Layout';
import LoginPage, { CreateAccountForm, LoginForm } from './views/Login';

const tasStashTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // hot pink
      main: '#ff00ff',
    },
    // dark desaturated violet
    secondary: {
      main: '#8a2be2',
    },
    error: {
      // bright red
      main: '#c90d0d',
    },
    // cyan
    info: {
      main: '#00ffea',
    },
    // bright, lime green
    success: {
      main: '#00ff95',
    },
  },
});

const App: Component = () => (
  <>
    <ThemeProvider theme={tasStashTheme}>
      <Background>
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
      </Background>
    </ThemeProvider>
  </>
);

export default App;
