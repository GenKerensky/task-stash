// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trampoline<T extends (args: any) => any>(f: T) {
  return function trampolined(...args: Parameters<T>) {
    let result = f.bind(null, ...args);

    while (typeof result === 'function') result = result();

    return result;
  };
}
