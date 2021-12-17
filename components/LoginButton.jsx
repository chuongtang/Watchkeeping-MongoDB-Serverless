import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'primereact/button';

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (!isAuthenticated && (<Button type="button" label="Sign in" icon="pi pi-sign-in" className="p-button-raised p-button-warning" onClick={() => loginWithRedirect()}></Button>))
};

export default LoginButton;