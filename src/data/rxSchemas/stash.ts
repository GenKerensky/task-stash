import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

export const stashSchemaLiteral = {
  title: 'stash schema',
  description: 'stash object',
  version: 0,
  keyCompression: true,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 12 },
    title: { type: 'string' },
    description: { type: 'string' },
    tasks: { type: 'array', items: { type: 'string' } },
    sharedWith: { type: 'array', items: { type: 'string' } },
    userId: { type: 'string' },
    updatedAt: { type: 'number' },
  },
  required: ['id', 'title', 'userId'],
  encrypted: ['title', 'description', 'tasks', 'sharedWith'],
} as const;

const schemaTyped = toTypedRxJsonSchema(stashSchemaLiteral);

export type StashDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const stashesSchema: RxJsonSchema<StashDocType> = stashSchemaLiteral;

export type StashesCollection = RxCollection<StashDocType>;
