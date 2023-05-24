import { AccountCircle } from '@suid/icons-material';
import { CircularProgress, IconButton, Menu, MenuItem } from '@suid/material';
import { Component, createSignal } from 'solid-js';

import { logout } from '../../../controllers/logout';

export const AccountButton: Component = () => {
  const menuId = 'account-menu';

  const [anchorEl, setAnchorEl] = createSignal<HTMLElement | null>(null);
  const [loading, setLoading] = createSignal(false);
  const open = () => Boolean(anchorEl());

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    setLoading(true);
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {loading() ? <CircularProgress size={24} /> : <AccountCircle />}
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open()}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
