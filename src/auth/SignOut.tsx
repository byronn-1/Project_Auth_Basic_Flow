import React, { useState } from "react";
import { signOut } from "../model/auth/AuthActions";
import { useAppDispatch } from "../model/store";
import { ReactComponent as LogoutIcon } from "../icons/logout.svg";

export function SignOut() {
  const dispatch = useAppDispatch();
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <>
      <div
        className="navicon"
        aria-label="log out"
        onClick={() => setConfirmLogout(true)}
        id="auth-signout"
      >
        <LogoutIcon />
        <div>Log Out</div>
      </div>
      {confirmLogout && (
        <>
          <div className="confirm-reset-popup">
            <h2>Log out</h2>
            <div className="message">Are you sure you want to leave?</div>
            <button
              type="button"
              className="confirm-yes"
              onClick={() => {
                dispatch(signOut());
                setConfirmLogout(false);
              }}
            >
              YES
            </button>
            <button
              type="button"
              className="confirm-no"
              onClick={() => setConfirmLogout(false)}
            >
              Cancel
            </button>
          </div>
          <div className="modal-overlay" />
        </>
      )}
    </>
  );
}
