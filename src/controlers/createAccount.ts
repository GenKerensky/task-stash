import {
  derivePrivateKey,
  deriveVerifier,
  generateSalt,
} from 'secure-remote-password/client';

import * as api from '../api';
import { asyncPBKDF2, newKeyPair } from '../crypto';
import { initializeRxDB } from '../data';

export const createAccount = async (email: string, password: string) => {
  // Generate account keys
  const salt = generateSalt();
  const passphrase = await asyncPBKDF2(password, salt);
  const { publicKey, privateKey } = await newKeyPair(email, passphrase);

  const srpPrivateKey = derivePrivateKey(salt, email, passphrase);
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

  await initializeRxDB(email, passphrase);

  return response.statusText;
};
