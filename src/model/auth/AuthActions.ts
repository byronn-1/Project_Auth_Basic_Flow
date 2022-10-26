import { Auth, CognitoUser } from "@aws-amplify/auth";
import { Logger } from "@aws-amplify/core";

import { RESET_PASSWORD, SIGNED_IN, SIGNED_OUT } from "./AuthStates";
import { setAuthError, setAuthState, User } from "./AuthSlice";
import { AppThunk } from "../store";

const logger = new Logger("auth-utils");

export function signIn(name: string, password: string): AppThunk {
  return function (dispatch) {
    return Auth.signIn(name, password)
      .then((cognitoUser: CognitoUser) => {
        logger.debug(cognitoUser);
        if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
          logger.debug("require new password");
          dispatch(
            setAuthState({
              authState: RESET_PASSWORD,
              user: { name: cognitoUser.getUsername(), cognitoUser },
            })
          );
        } else if (cognitoUser.challengeName) {
          logger.debug("auth challenge response: " + cognitoUser.challengeName);
          dispatch(
            setAuthError(
              "auth challenge response: " + cognitoUser.challengeName
            )
          );
        } else {
          return dispatch(
            setAuthState({
              authState: SIGNED_IN,
              user: { name: cognitoUser.getUsername() },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(setAuthError(error.message));
        if (error.code === "UserNotConfirmedException") {
          logger.debug("the user is not confirmed");
          dispatch(setAuthError("user not confirmed"));
        } else if (error.code === "PasswordResetRequiredException") {
          logger.debug("the user requires a new password");
          dispatch(setAuthError("password reset required"));
        }
      });
  };
}

export function signOut(): AppThunk {
  return function (dispatch) {
    return Auth.signOut()
      .then(() => dispatch(setAuthState({ authState: SIGNED_OUT })))
      .catch((error) => dispatch(setAuthError(error.message)));
  };
}

export function completeNewPassword(user: User, newPassword: string): AppThunk {
  return function (dispatch) {
    let getUserPromise = null;
    if (!user.cognitoUser) {
      getUserPromise = () => Auth.currentAuthenticatedUser();
    } else {
      getUserPromise = () => Promise.resolve(user.cognitoUser);
    }
    return getUserPromise()
      .then((cognitoUser) =>
        Auth.completeNewPassword(cognitoUser, newPassword, {})
      )
      .then((cognitoUser) => {
        if (cognitoUser.challengeName) {
          logger.debug("auth challenge response: " + cognitoUser.challengeName);
          dispatch(
            setAuthError(
              "auth challenge response: " + cognitoUser.challengeName
            )
          );
        } else {
          return dispatch(
            setAuthState({
              authState: SIGNED_IN,
              user: { name: cognitoUser.getUsername() },
            })
          );
        }
      })
      .catch((error) => dispatch(setAuthError(error.message)));
  };
}

export function signInCurrentUser(): AppThunk {
  return function (dispatch) {
    return Auth.currentAuthenticatedUser()
      .then((cognitoUser) =>
        dispatch(
          setAuthState({
            authState: SIGNED_IN,
            user: {
              name: cognitoUser.getUsername(),
            },
          })
        )
      )
      .catch(() => {
        logger.info("User not logged in");
        return Promise.resolve("User not logged in");
      });
  };
}
