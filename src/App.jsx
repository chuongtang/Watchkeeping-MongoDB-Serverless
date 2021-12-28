import React, {useState} from 'react'
import NavBar from "../components/NavBar";
import './App.css';
import MainPage from "../components/MainPage";
import CrewmemberList from '../components/CrewList/CrewmemberList';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import CrewList from '../components/CrewList/CrewList';
import GridBody from '../components/GridBody/GridBody';



function App() {
  const [showCrewlist, setShowCrewlist] = useState(false);
  const [showMainPage, setShowMainPage] = useState(true);
  const [showTimeReport, setShowTimeReport] = useState(false);
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const toggleCrewlist =() =>{
    setShowCrewlist(true);
    setShowMainPage(false);
    setShowTimeReport(false);
  }
  const toggleMainPage =() =>{
    setShowCrewlist(false);
    setShowMainPage(true);
    setShowTimeReport(false);
  }
  const toggleTimeReport =() =>{
    setShowCrewlist(false);
    setShowMainPage(false);
    setShowTimeReport(true);
  }


  return (
    <div>
      <NavBar />
      {isAuthenticated && <div className="p-p-3">
        {!showMainPage &&<Button type="button" label="" icon="pi pi-home" className="p-button-rounded p-mx-4" onClick={() => toggleMainPage()}>
        </Button>}

        {!showCrewlist && <Button type="button" label="Manage crew list" icon="pi pi-users" className="p-button-raised p-button-rounded p-button-warning p-button-text p-mx-4 mt-2" onClick={() => toggleCrewlist()}>
        </Button>}

        {!showTimeReport && <Button type="button" label="Create Time report" icon="pi pi-clock" className="p-button-raised p-button-rounded p-button-info p-button-text" onClick={() => toggleTimeReport()}>
        </Button>}
        
        </div>
      }
      {showCrewlist && <CrewList/>}
      {showMainPage && <MainPage />}
      {showTimeReport && <GridBody />}

    </div>
  )
}

export default App
