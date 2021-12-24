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
import CrewList from "../components/CrewList/CrewList";
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
        <div className="p-d-flex">
            <Toast ref={toast} />
            <Toolbar left={leftContents} right={rightContents} style={{width : "100vw"}} />
           
        </div>
    );
}
export default NavBar