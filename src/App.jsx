import React from 'react'
import NavBar from "../components/NavBar";
import './App.css';
import MainPage from "../components/MainPage";
import CrewmemberList from '../components/CrewList/CrewmemberList';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';



function App() {

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <div>
      <NavBar />
      {isAuthenticated && <div>
        <Button type="button" label="Manage crew list" icon="pi pi-users" className="p-button-raised p-button-rounded p-button-warning p-button-text p-mx-4 mt-2" onClick={() => setDisplayMaximizable(true)}>
        </Button>
        {/* <Dialog visible={displayMaximizable} maximizable modal style={{ width: '80vw' }} onHide={() => onHide()}>
          <CrewList />
        </Dialog> */}

        <Button type="button" label="Create Time report" icon="pi pi-clock" className="p-button-raised p-button-rounded p-button-info p-button-text" onClick={() => setDisplayReportMaximizable(true)}>
        </Button>
        {/* <Dialog visible={displayReportMaximizable} maximizable modal style={{ width: '90vw' }} onHide={() => onHide()}>
          <GridBody />
        </Dialog> */}
        </div>
      }
      <MainPage />

    </div>
  )
}

export default App
