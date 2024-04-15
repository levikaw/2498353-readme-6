export const LENGTH_PASSWORD = {
  MAX: 12,
  MIN: 6,
};
export const FAIL_PASSWORD_VALIDATION: string = `Password is not strong enough. Must contain ${LENGTH_PASSWORD.MIN}-${LENGTH_PASSWORD.MAX} characters`;
