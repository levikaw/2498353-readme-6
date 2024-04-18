export const LENGTH_PASSWORD = {
  MAX: 12,
  MIN: 6,
} as const;
export const FAIL_PASSWORD_VALIDATION = `Password is not strong enough. Must contain ${LENGTH_PASSWORD.MIN}-${LENGTH_PASSWORD.MAX} characters`;
