import { Check } from '@suid/icons-material';
import { Lock, Menu as MenuIcon } from '@suid/icons-material';
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  SvgIcon,
  Toolbar,
  Typography,
} from '@suid/material';
import { Component } from 'solid-js';

import { AccountButton } from './AccountButton';
import { Notifications } from './Notifications';

export const AppBar: Component = () => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton edge="start" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: '#FFFFFFEE',
              padding: 1,
            }}
          >
            <SvgIcon fontSize="small">
              <Check />
            </SvgIcon>
            <SvgIcon fontSize="small">
              <Lock />
            </SvgIcon>
          </Box>
          <Typography
            variant="h1"
            color="#FFFFFFEE"
            textAlign="center"
            fontSize={24}
          >
            Task Stash
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Notifications />
        <AccountButton />
      </Toolbar>
    </MuiAppBar>
  );
};
