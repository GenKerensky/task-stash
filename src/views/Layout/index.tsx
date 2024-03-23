import { Outlet, useNavigate } from '@solidjs/router';
import { Container, Paper } from '@suid/material';
import type { Component } from 'solid-js';

import { currentUser } from '../../controllers/user';
import { AppBar } from './AppBar';

const Layout: Component = () => {
  const navigation = useNavigate();

  if (!currentUser()) {
    navigation('/login', { replace: true });
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <AppBar />
      <Paper sx={{ flexGrow: 1 }}>
        <Outlet />
      </Paper>
    </Container>
  );
};

export default Layout;
