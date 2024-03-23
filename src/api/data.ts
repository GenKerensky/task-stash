export type Account = {
  email: string;
  publicKey: string;
  privateKey: string;
  verifier: string;
  salt: string;
};
export const accounts = new Map<string, Account>();

export type Notification = {
  id: string;
  for: string;
  title: string;
  body: string;
  icon: string;
  data: Record<string, unknown>;
  timestamp: number;
};
export const notifications = new Map<string, Notification>();

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: number;
  notifications: string[];
  updatedAt: number;
};
export const tasks = new Map<string, Task>();

export type Stash = {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  sharedWith: string[];
  updatedAt: number;
};
export const stashes = new Map<string, Stash>();

export let clientEmail: string;
export const setClientEmail = (value: string) => {
  clientEmail = value;
};

export let clientPublicEphemeral: string;
export const setClientPublicEphemeral = (value: string) => {
  clientPublicEphemeral = value;
};

export let serverPrivateEphemeral: string;
export const setServerPrivateEphemeral = (value: string) => {
  serverPrivateEphemeral = value;
};

export let serverSessionKey: string;
export const setServerSessionKey = (value: string) => {
  serverSessionKey = value;
};
