import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

export const notificationsSchemaLiteral = {
  title: 'notification schema',
  description: 'notification object',
  version: 0,
  keyCompression: true,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 12 },
    for: { type: 'string' },
    title: { type: 'string' },
    body: { type: 'string' },
    icon: { type: 'string' },
    data: { type: 'object' },
    timestamp: { type: 'number' },
  },
  required: ['id', 'title', 'timestamp'],
  encrypted: ['title', 'body', 'icon', 'data', 'timestamp'],
} as const;

const schemaTyped = toTypedRxJsonSchema(notificationsSchemaLiteral);

export type NotificationDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
> & { data: Record<string, unknown> };

export const notificationsSchema: RxJsonSchema<NotificationDocType> =
  notificationsSchemaLiteral;

export type NotificationsCollection = RxCollection<NotificationDocType>;
