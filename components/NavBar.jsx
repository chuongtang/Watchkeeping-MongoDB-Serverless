import React, { useState, useRef } from 'react';

import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Message } from 'primereact/message';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import CrewList from "./CrewList";
import GridBody from "./GridBody/GridBody";
import Logo from "../src/images/Logo.png";




const NavBar = () => {

    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayReportMaximizable, setDisplayReportMaximizable] = useState(false);

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

    const onHide = () => {
        setDisplayMaximizable(false);
        setDisplayReportMaximizable(false);
    }

    const leftContents = (
        <React.Fragment>
            <img alt="logo" src={Logo} height="40"></img>
            {isAuthenticated && <div>
                <Button type="button" label="Manage crew list" icon="pi pi-users" className="p-button-raised p-button-rounded p-button-warning p-button-text p-mx-4" onClick={() => setDisplayMaximizable(true)}>
                </Button>
                <Dialog visible={displayMaximizable} maximizable modal style={{ width: '80vw' }} onHide={() => onHide()}>
                   <CrewList />
                </Dialog>

                <Button type="button" label="Create Time report" icon="pi pi-clock" className="p-button-raised p-button-rounded p-button-info p-button-text" onClick={() => setDisplayReportMaximizable(true)}>
                </Button> 
                <Dialog visible={displayReportMaximizable} maximizable modal style={{ width: '90vw' }} onHide={() => onHide()}>
                   <GridBody />
                </Dialog></div>
                }
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