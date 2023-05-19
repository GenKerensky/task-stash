import { Account, accounts } from './data';

export const createAccount = async (params: Account) => {
  accounts.set(params.email, params);

  const response = {
    email: params.email,
    publicKey: params.publicKey,
    privateKey: params.privateKey,
  };

  console.log({ params, response });
  return {
    status: 200,
    statusText: 'Account Created!',
    ok: true,
    json: async () => response,
  } as Response;
};
