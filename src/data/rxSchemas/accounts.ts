import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

export const accountsSchemaLiteral = {
  title: 'account schema',
  description: 'user account object',
  version: 0,
  keyCompression: true,
  primaryKey: 'email',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', maxLength: 255 },
    publicKey: { type: 'string' },
    privateKey: { type: 'string' },
    salt: { type: 'string' },
    updatedAt: { type: 'number' },
  },
  required: ['email', 'publicKey'],
  encrypted: ['publicKey', 'privateKey', 'salt'],
} as const;

const schemaTyped = toTypedRxJsonSchema(accountsSchemaLiteral);

export type AccountDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const accountsSchema: RxJsonSchema<AccountDocType> =
  accountsSchemaLiteral;

export type AccountsCollection = RxCollection<AccountDocType>;
