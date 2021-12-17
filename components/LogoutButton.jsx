import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button type="button" label="Sign out" icon="pi pi-sign-out" className="p-button-raised p-button-warning p-button-text" onClick={() => logout()}>
      </Button>
    )
  )
}

export default LogoutButton