export const latency = (delayMilliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMilliseconds * 100));
