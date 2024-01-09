export const MINIMUM_FLOAT = 0.001;

export const isLimited = (value: number, limiter: number) => Math.abs(value) < limiter;