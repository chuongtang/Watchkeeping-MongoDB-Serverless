import React, { useState, useRef } from 'react';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Message } from 'primereact/message';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Badge } from 'primereact/badge';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';




const NavBar = () => {

    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const [showCrewList, setShowCrewList] = useState(false);
    const [showGridBody, setShowGridBody] = useState(false);

    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();

    if (isLoading) {
        return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />;
    }
    if (error) {

        return (<div className="p-col-12 p-md-3">
            <Message severity="error" text={error.message} />
        </div>);

    }

    const accept = () => {
        logout();
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have signed out', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'info', summary: 'Thank you', detail: 'Continue..', life: 1500 });
    }


    const leftContents = (
        <React.Fragment>
            <img alt="logo" src="../components/Logo.png" height="40"></img>
            {isAuthenticated && <div>
                <Button type="button" label="Manage crew list" icon="pi pi-users" className="p-button-raised p-button-rounded p-button-warning p-button-text p-mx-4" onClick={() => setShowCrewList(true)}>
                </Button>
                <Button type="button" label="Manage vessel list" icon="pi pi-flag-fill" className="p-button-raised p-button-rounded p-button-info p-button-text" onClick={() => console.log("VesselList clicked")}>
                </Button></div>}
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>

            {isAuthenticated && <div> <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Do you want to sign out of your account?"
                header="Signing out" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                <Button onClick={() => setVisible(true)} icon="pi pi-user" type="button" label={`:   ${user.email}`} className="p-button-raised p-button-rounded p-mr-2"></Button> </div>}
            <LoginButton />
            {/* <LogoutButton /> */}
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <Toolbar left={leftContents} right={rightContents} />
        </div>
    );
}
export default NavBar