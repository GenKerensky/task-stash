import { generateEphemeral } from 'secure-remote-password/server';

import {
  accounts,
  setClientEmail,
  setClientPublicEphemeral,
  setServerPrivateEphemeral,
} from './data';

export const login = async (params: {
  email: string;
  clientPublicEphemeral: string;
}) => {
  setClientEmail(params.email);
  setClientPublicEphemeral(params.clientPublicEphemeral);
  const account = accounts.get(params.email);

  if (account) {
    const serverEphemeral = generateEphemeral(account.verifier);
    setServerPrivateEphemeral(serverEphemeral.secret);
    const response = {
      salt: account.salt,
      serverPublicEphemeral: serverEphemeral.public,
    };
    console.log({ params, response });
    return {
      status: 200,
      ok: true,
      statusText: 'OK',
      json: async () => response,
    } as Response;
  }

  const serverEphemeral = generateEphemeral(
    "No account, but don't tell them that"
  );
  setServerPrivateEphemeral(serverEphemeral.secret);
  const response = {
    salt: "No account, but don't tell them that",
    serverPublicEphemeral: serverEphemeral.public,
  };
  console.log({ params, response });
  return {
    status: 200,
    ok: true,
    statusText: 'OK',
    json: async () => response,
  } as Response;
};
