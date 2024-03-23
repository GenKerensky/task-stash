import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
// import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { Subject } from 'rxjs';

import { AccountsCollection, accountsSchema } from './rxSchemas/accounts';
import {
  NotificationsCollection,
  notificationsSchema,
} from './rxSchemas/notifications';
import { StashesCollection, stashesSchema } from './rxSchemas/stash';
import { TasksCollection, tasksSchema } from './rxSchemas/task';

addRxPlugin(RxDBDevModePlugin);

type TaskStashDatabaseCollections = {
  accounts: AccountsCollection;
  notifications: NotificationsCollection;
  tasks: TasksCollection;
  stashes: StashesCollection;
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
  email: string,
  privateKey: string
): Promise<TaskStashDatabase> => {
  db$.next({ db: null, status: 'initializing' });
  try {
    const cleanedEmail = email.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const rxdb = await createRxDatabase<TaskStashDatabaseCollections>({
      name: `${cleanedEmail}-task-stash-db`,
      storage: wrappedKeyEncryptionCryptoJsStorage({
        storage: wrappedKeyCompressionStorage({
          // storage: getRxStorageDexie(),
          storage: getRxStorageMemory(),
        }),
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
      stashes: {
        schema: stashesSchema,
      },
    });

    db$.next({ db: rxdb, status: 'initialized' });
    return rxdb;
  } catch (error) {
    db$.next({ db: null, status: 'error', error: error as Error });
    throw error;
  }
};
