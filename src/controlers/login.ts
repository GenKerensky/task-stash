import {
  derivePrivateKey,
  deriveSession,
  generateEphemeral,
  verifySession,
} from 'secure-remote-password/client';

import * as api from '../api';
import { asyncPBKDF2 } from '../crypto';
import { initializeRxDB } from '../data';

export const login = async (email: string, password: string) => {
  const clientEphemeral = generateEphemeral();

  const loginResponse = await api.login({
    email,
    clientPublicEphemeral: clientEphemeral.public,
  });

  if (!loginResponse.ok) {
    throw new Error(loginResponse.statusText);
  }

  const { salt, serverPublicEphemeral } = (await loginResponse.json()) as {
    salt: string;
    serverPublicEphemeral: string;
  };

  const passphrase = await asyncPBKDF2(password, salt);
  const privateKey = derivePrivateKey(salt, email, passphrase);
  const clientSession = deriveSession(
    clientEphemeral.secret,
    serverPublicEphemeral,
    salt,
    email,
    privateKey
  );

  const sessionResponse = await api.generateSession({
    clientSessionProof: clientSession.proof,
  });

  if (!sessionResponse.ok) {
    throw new Error(sessionResponse.statusText);
  }

  const { serverSessionProof } = (await sessionResponse.json()) as {
    serverSessionProof: string;
  };

  verifySession(clientEphemeral.public, clientSession, serverSessionProof);

  await initializeRxDB(email, passphrase);

  return sessionResponse.statusText;
};
