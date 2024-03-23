import { Key, PrivateKey } from 'openpgp';

export interface User {
  email: string;
  publicKey: Key;
  privateKey: PrivateKey;
  accountKey: string;
}
