export const customDelay = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms));
