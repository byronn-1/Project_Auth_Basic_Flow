import React, { useEffect, useState } from "react";
import { AuthState, SIGNED_IN, RESET_PASSWORD } from "../model/auth/AuthStates";
import {
  completeNewPassword,
  signIn,
  signInCurrentUser,
} from "../model/auth/AuthActions";
import { getAuthError, getAuthState, getUser } from "../model/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../model/store";

const USERNAME_ID = "usernameInput";
const PASSWORD_ID = "passwordInput";
const MIN_PASSWORD_LENGTH = 6;

export function isAuthenticating(state: AuthState) {
  return state !== SIGNED_IN;
}

export function SignIn() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(getAuthState);
  const authError = useAppSelector(getAuthError);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useAppSelector(getUser)!;

  useEffect(() => {
    dispatch(signInCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    setLoading(false);
  }, [authState, authError]);

  useEffect(() => {
    setPassword("");
  }, [authState]);

  function handleSignIn() {
    setLoading(true);
    // TODO return thunk promise to switch off loading
    dispatch(signIn(username, password!));
  }

  function handleChangePassword() {
    setLoading(true);
    // TODO return thunk promise to switch off loading
    dispatch(completeNewPassword(user, password!));
  }

  if (!isAuthenticating(authState)) {
    return null;
  }

  if (authState === RESET_PASSWORD) {
    return (
      <div className="signin">
        <h2>Change Password</h2>
        <label htmlFor={PASSWORD_ID}>New password</label>
        <input
          id={PASSWORD_ID}
          type="password"
          onInput={(event) => {
            setPassword((event.target as HTMLInputElement).value);
          }}
          value={password}
        />

        <div className="action-row">
          <button
            id="action-button"
            onClick={handleChangePassword}
            disabled={
              loading || !password || password.length < MIN_PASSWORD_LENGTH
            }
          >
            {loading ? <div className="loader" /> : <span>Change</span>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signin">
      <h2>Log in</h2>

      <label htmlFor={USERNAME_ID}>Username</label>
      <input
        id={USERNAME_ID}
        type="name"
        onInput={(event) =>
          setUsername((event.target as HTMLInputElement).value)
        }
        placeholder={"Enter your username"}
      />

      <label htmlFor={PASSWORD_ID}>Password</label>
      <input
        id={PASSWORD_ID}
        type="password"
        onInput={(event) =>
          setPassword((event.target as HTMLInputElement).value)
        }
        value={password}
      />
      {authError ? <div className="auth-alert">{authError}</div> : null}
      <div className="action-row">
        <button
          id="action-button"
          onClick={handleSignIn}
          disabled={loading || username.length === 0 || !password}
        >
          {loading ? <div className="loader" /> : <span>Log In</span>}
        </button>
      </div>
    </div>
  );
}
