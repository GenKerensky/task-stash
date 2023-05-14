import { createRxDatabase, RxDatabase } from 'rxdb';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { Subject } from 'rxjs';

import { AccountsCollection, accountsSchema } from './rxSchemas/accounts';
import {
  NotificationsCollection,
  notificationsSchema,
} from './rxSchemas/notifications';
import { TasksCollection, tasksSchema } from './rxSchemas/task';

type TaskStashDatabaseCollections = {
  accounts: AccountsCollection;
  notifications: NotificationsCollection;
  tasks: TasksCollection;
};
export type TaskStashDatabase = RxDatabase<TaskStashDatabaseCollections>;

type DBStatus = {
  db: TaskStashDatabase | null;
  status: 'initializing' | 'initialized' | 'error';
  error?: Error | Error[];
};

export const db$ = new Subject<DBStatus>();

export const db = new Promise<TaskStashDatabase>((resolve, reject) => {
  db$.subscribe((dbStatus) => {
    if (dbStatus.status === 'initialized' && dbStatus.db) {
      resolve(dbStatus.db);
    } else if (dbStatus.status === 'error') {
      reject(dbStatus.error);
    }
  });
});

export const initializeRxDB = async (
  username: string,
  privateKey: string
): Promise<TaskStashDatabase> => {
  db$.next({ db: null, status: 'initializing' });
  try {
    const rxdb = await createRxDatabase<TaskStashDatabaseCollections>({
      name: `${username}-task-stash-db`,
      storage: wrappedKeyEncryptionCryptoJsStorage({
        storage: getRxStorageDexie(),
      }),
      password: privateKey,
    });

    await rxdb.addCollections({
      accounts: {
        schema: accountsSchema,
      },
      notifications: {
        schema: notificationsSchema,
      },
      tasks: {
        schema: tasksSchema,
      },
    });

    db$.next({ db: rxdb, status: 'initialized' });
    return rxdb;
  } catch (error) {
    db$.next({ db: null, status: 'error', error: error as Error });
    throw error;
  }
};
