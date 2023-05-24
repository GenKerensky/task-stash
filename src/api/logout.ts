import { latency } from './latency';

export const logout = async () => {
  await latency(200);
  return { status: 200, statusText: 'User logged out', ok: true } as Response;
};
