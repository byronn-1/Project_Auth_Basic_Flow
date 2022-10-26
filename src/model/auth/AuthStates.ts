export const SIGNED_OUT = "SignedOut";
export const SIGNED_IN = "SignedIn";
export const RESET_PASSWORD = "ResetPassword";

export type AuthState = typeof SIGNED_OUT | typeof SIGNED_IN | typeof RESET_PASSWORD;
