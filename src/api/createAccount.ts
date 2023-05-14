/* eslint-disable @typescript-eslint/no-unused-vars */

export const createAccount = async (params: {
  email: string;
  publicKey: string;
  privateKey: string;
  verifier: string;
  salt: string;
}) =>
  ({
    status: 200,
    statusText: 'Account Created!',
  } as Response);
