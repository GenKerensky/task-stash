import { BehaviorSubject } from 'rxjs';
import { createSignal } from 'solid-js';

import { User } from '../models/User';

const currentUser$ = new BehaviorSubject<User | null>(null);

const [currentUser, _setCurrentUser] = createSignal<User | null>(null);

currentUser$.subscribe(_setCurrentUser);

export { currentUser, currentUser$ };
