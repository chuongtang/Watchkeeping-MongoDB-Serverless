import React, { useState, useEffect } from 'react'
import NavBar from "../components/NavBar";
import './App.css';
import MainPage from "../components/MainPage";
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import CrewList from '../components/CrewList/CrewList';
import GridBody from '../components/GridBody/GridBody';
import dotenv from 'dotenv';
import * as Realm from "realm-web";


function App() {
  const [showCrewlist, setShowCrewlist] = useState(false);
  const [showMainPage, setShowMainPage] = useState(true);
  const [showTimeReport, setShowTimeReport] = useState(false);

  const REALM_APP_ID = import.meta.env.VITE_REALM_APP_ID;
  const REALM_APP_APIKEY = import.meta.env.VITE_REALM_APP_APIKEY;
  const [mongoUser, setMongoUser] = useState('')

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const auth0User = user;
  console.log(auth0User);

  // Loging MongDB Realm
  useEffect(async () => {

    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.apiKey(REALM_APP_APIKEY);

    try {
      const loggedInUser = await app.logIn(credentials);
    
      setMongoUser(loggedInUser)
      console.log("userIN Mongodb", loggedInUser)
      
    
    } catch (error) {
      console.error(error);
    }
  }, []);

  const toggleCrewlist = () => {
    setShowCrewlist(true);
    setShowMainPage(false);
    setShowTimeReport(false);
  }
  const toggleMainPage = () => {
    setShowCrewlist(false);
    setShowMainPage(true);
    setShowTimeReport(false);
  }
  const toggleTimeReport = () => {
    setShowCrewlist(false);
    setShowMainPage(false);
    setShowTimeReport(true);
  }


  return (
    <div>
      <NavBar />
      {/* <UpdateCrewDetail/> */}
      {isAuthenticated && <div className="p-p-3">
        {!showMainPage && <Button type="button" label="" icon="pi pi-home" className="p-button-rounded p-mx-4" onClick={() => toggleMainPage()}>
        </Button>}

        {!showCrewlist && <Button type="button" label="Manage crew list" icon="pi pi-users" className="p-button-raised p-button-rounded p-button-warning p-button-text p-mx-4 mt-2" onClick={() => toggleCrewlist()}>
        </Button>}

        {!showTimeReport && <Button type="button" label="Create Time report" icon="pi pi-clock" className="p-button-raised p-button-rounded p-button-info p-button-text" onClick={() => toggleTimeReport()}>
        </Button>}

      </div>
      }
      {showCrewlist && <CrewList user={mongoUser} appUser={auth0User} />}
      {showMainPage && <MainPage />}
      {showTimeReport && <GridBody />}

    </div>
  )
}

export default App
