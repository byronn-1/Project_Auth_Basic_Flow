import { CognitoUser } from "@aws-amplify/auth";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthState, SIGNED_OUT } from "./AuthStates";

export interface User {
  name: string;
  cognitoUser?: CognitoUser;
}

export interface AuthStoreState {
  authState: AuthState;
  errorMessage: string;
  user?: User;
}

export function initialState(): AuthStoreState {
  return {
    authState: SIGNED_OUT,
    errorMessage: "",
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    setAuthState: (state, action) => {
      const { authState, user } = action.payload;
      if (authState === undefined) {
        console.error("authState cannot be undefined");
        return state;
      }
      return {
        ...state,
        authState,
        user,
        errorMessage: "",
      };
    },
    setAuthError: (state, action) => {
      state.errorMessage = action.payload;
      return state;
    },
    clearAuthError: (state) => {
      return state.errorMessage === "" ? state : { ...state, errorMessage: "" };
    },
    setState: (_state, action) => {
      const newState: AuthStoreState = action.payload;
      return newState;
    },
  },
});

export const { setAuthState, setAuthError, clearAuthError, setState } =
  authSlice.actions;

export const getAuthState = (state: RootState) => state.auth.authState;

export const getAuthError = (state: RootState) => state.auth.errorMessage;

export const getUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
