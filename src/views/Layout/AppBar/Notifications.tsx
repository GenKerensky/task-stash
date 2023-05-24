import { Notifications as NotificationsIcon } from '@suid/icons-material';
import { Badge, IconButton } from '@suid/material';
import { Component } from 'solid-js';

export const Notifications: Component = () => {
  return (
    <IconButton size="large" aria-label="show 17 new notifications">
      <Badge badgeContent={17} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};
