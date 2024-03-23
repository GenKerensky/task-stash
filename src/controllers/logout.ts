import * as api from '../api';

export const logout = async () => {
  const response = await api.logout();
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return response;
};
