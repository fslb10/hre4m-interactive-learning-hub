const TEACHER_PIN = '0415';
const TEACHER_SESSION_KEY = 'hre4m:teacher-access';

type SessionStore = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function activeStore(store?: SessionStore): SessionStore | null {
  if (store) return store;
  return typeof sessionStorage === 'undefined' ? null : sessionStorage;
}

export function validTeacherPin(value: string): boolean {
  return value.trim() === TEACHER_PIN;
}

export function hasTeacherAccess(store?: SessionStore): boolean {
  return activeStore(store)?.getItem(TEACHER_SESSION_KEY) === 'granted';
}

export function grantTeacherAccess(pin: string, store?: SessionStore): boolean {
  if (!validTeacherPin(pin)) return false;
  activeStore(store)?.setItem(TEACHER_SESSION_KEY, 'granted');
  return true;
}

export function revokeTeacherAccess(store?: SessionStore): void {
  activeStore(store)?.removeItem(TEACHER_SESSION_KEY);
}
