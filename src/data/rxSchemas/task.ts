import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

export const taskSchemaLiteral = {
  title: 'task schema',
  description: 'task object',
  version: 0,
  keyCompression: true,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 12 },
    title: { type: 'string' },
    description: { type: 'string' },
    completed: { type: 'boolean' },
    dueDate: { type: 'number' },
    notifications: { type: 'array', items: { type: 'string' } },
    userId: { type: 'string' },
    updatedAt: { type: 'number' },
  },
  required: ['id', 'title', 'userId'],
  encrypted: ['title', 'description', 'completed', 'dueDate', 'notifications'],
} as const;

const schemaTyped = toTypedRxJsonSchema(taskSchemaLiteral);

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const tasksSchema: RxJsonSchema<TaskDocType> = taskSchemaLiteral;

export type TasksCollection = RxCollection<TaskDocType>;
