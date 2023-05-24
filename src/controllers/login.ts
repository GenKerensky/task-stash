import { decryptKey, readKey, readPrivateKey } from 'openpgp';
import {
  derivePrivateKey,
  deriveSession,
  generateEphemeral,
  verifySession,
} from 'secure-remote-password/client';

import * as api from '../api';
import { deriveKeyFromPassword } from '../crypto';
import { initializeRxDB } from '../data';
import { currentUser$ } from './user';

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

  const passphrase = await deriveKeyFromPassword(password, salt);
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

  const { serverSessionProof, user } = (await sessionResponse.json()) as {
    serverSessionProof: string;
    user: {
      email: string;
      publicKey: string;
      privateKey: string;
    };
  };

  verifySession(clientEphemeral.public, clientSession, serverSessionProof);

  await initializeRxDB(email, passphrase);

  currentUser$.next({
    email: user.email,
    publicKey: await readKey({ armoredKey: user.publicKey }),
    privateKey: await decryptKey({
      privateKey: await readPrivateKey({ armoredKey: user.privateKey }),
      passphrase,
    }),
    accountKey: passphrase,
  });

  return sessionResponse.statusText;
};
