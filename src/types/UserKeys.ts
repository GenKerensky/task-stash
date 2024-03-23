import { SerializedKeyPair } from 'openpgp';

export interface UserKeys extends SerializedKeyPair<string> {
  revocationCertificate: string;
}
