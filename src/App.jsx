import { useState } from 'react'
import NavBar from "../components/NavBar";
import './App.css';
import MainPage from "../components/MainPage";
import GridBody from "../components/GridBody/GridBody";
import CrewList from "../components/CrewList";
import { useAuth0 } from '@auth0/auth0-react';




function App() {

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [showCrewList, setShowCrewList] = useState(false)
  const [showGridBody, setShowGridBody] = useState(false)
  return (
    <div>
      <NavBar />
      <MainPage />
      <br />
      {showGridBody && <GridBody />}
      {showCrewList && <CrewList />}
    </div>
  )
}

export default App
