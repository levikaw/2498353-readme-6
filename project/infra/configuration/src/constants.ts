export const PORT = {
  MIN: 0,
  MAX: 65535,
} as const;
export enum Environment {
  Dev = 'development',
  Stage = 'stage',
  Prod = 'production',
}
