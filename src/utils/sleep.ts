export const sleep = (ms: number): Promise<void> => {
  return new Promise(r => {
    window.setTimeout(r, ms);
  });
};