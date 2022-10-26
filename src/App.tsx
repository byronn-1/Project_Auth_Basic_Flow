import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useAppSelector } from "./model/store";

import FrontPage from "./FrontPage";

import { isAuthenticating, SignIn } from "./auth/SignIn";
import { getAuthState } from "./model/auth/AuthSlice";
import { Amplify } from "@aws-amplify/core";


const awsConfig = {
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
  },
};

// eslint-disable-next-line jest/require-hook
console.debug("Configure", Amplify.configure(awsConfig));

function App() {
  const authState = useAppSelector(getAuthState);

  useEffect(() => {
    // Deal with webkit 'feature' where 100vh includes chrome at bottom
    function handleResizeEvent() {
      const rootElement = document.querySelector<HTMLElement>("#root")!;
      const appElement = document.querySelector<HTMLElement>(".root")!;
      appElement.style.height = `${window.innerHeight}px`;
      rootElement.style.height = `${window.innerHeight}px`;
    }

    window.addEventListener("resize", handleResizeEvent);

    handleResizeEvent();

    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  if (isAuthenticating(authState)) {
    return (
      <div className="root">
        <SignIn />
      </div>
    );
  }

  return (
    <div className="root">
      <Routes>
        <Route
          path="/"
          element={<FrontPage />} 
        />
      </Routes>
    </div>
  );
}

export default App;
