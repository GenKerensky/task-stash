import { decryptKey, readKey, readPrivateKey } from 'openpgp';
import {
  derivePrivateKey,
  deriveVerifier,
} from 'secure-remote-password/client';

import * as api from '../api';
import { deriveKeyFromPassword, generateSalt, newKeyPair } from '../crypto';
import { initializeRxDB } from '../data';
import { currentUser$ } from './user';

export const createAccount = async (email: string, password: string) => {
  // 128 bits of random data from CryptoSubtle browser API
  const salt = generateSalt(16);
  // Password is hashed with salt and argon2id algorithm using 5 iterations and 32MB of memory
  const key = await deriveKeyFromPassword(password, salt);
  // PGP keys are generated with OpenPGP.js for encrypting messages to the user
  const { publicKey, privateKey } = await newKeyPair(email, key);

  const srpPrivateKey = derivePrivateKey(salt, email, key);
  const verifier = deriveVerifier(srpPrivateKey);
  const response = await api.createAccount({
    email,
    publicKey,
    privateKey,
    verifier,
    salt,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  await initializeRxDB(email, key);

  currentUser$.next({
    email,
    publicKey: await readKey({ armoredKey: publicKey }),
    privateKey: await decryptKey({
      privateKey: await readPrivateKey({ armoredKey: privateKey }),
      passphrase: key,
    }),
    accountKey: key,
  });

  return response.statusText;
};
