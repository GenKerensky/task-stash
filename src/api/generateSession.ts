import { deriveSession } from 'secure-remote-password/server';

import {
  accounts,
  clientEmail,
  clientPublicEphemeral,
  serverPrivateEphemeral,
  setServerSessionKey,
} from './data';

export const generateSession = async (params: {
  clientSessionProof: string;
}) => {
  const account = accounts.get(clientEmail);

  if (account) {
    const serverSession = deriveSession(
      serverPrivateEphemeral,
      clientPublicEphemeral,
      account.salt,
      account.email,
      account.verifier,
      params.clientSessionProof
    );
    setServerSessionKey(serverSession.key);
    const response = {
      serverSessionProof: serverSession.proof,
      user: account,
    };
    console.log({ params, response });
    return {
      status: 200,
      ok: true,
      statusText: 'OK',
      json: async () => response,
    } as Response;
  }

  const response = {
    status: 401,
    ok: false,
    statusText: 'Unauthorized',
  } as Response;
  console.log({ params, response });
  return response;
};
