import React, {useState} from 'react';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Message } from 'primereact/message';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Badge } from 'primereact/badge';
import { ProgressSpinner } from 'primereact/progressspinner';




const NavBar = () => {
    
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();

    if (isLoading) {
        return <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>;
    }
    if (error) {

        return (<div className="p-col-12 p-md-3">
            <Message severity="error" text={error.message} />
        </div>);
        
    }

    const leftContents = (
        <React.Fragment>
           <img alt="logo" src="../components/Logo.png" height="40"></img>
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            {isAuthenticated && <Button type="button" label={`Signed in as  ${user.email}`} className="p-button-raised p-mr-2"></Button>}
            <LoginButton />
            <LogoutButton />
        </React.Fragment>
    );

    return (
        <div>
            <Toolbar left={leftContents} right={rightContents} />
        </div>
    );
}
export default NavBar