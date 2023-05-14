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
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    completed: { type: 'boolean' },
    dueDate: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  required: ['id', 'title'],
  encrypted: ['title', 'description', 'completed', 'dueDate'],
} as const;

const schemaTyped = toTypedRxJsonSchema(taskSchemaLiteral);

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const tasksSchema: RxJsonSchema<TaskDocType> = taskSchemaLiteral;

export type TasksCollection = RxCollection<TaskDocType>;
