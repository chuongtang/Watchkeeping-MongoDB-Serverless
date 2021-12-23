import React from 'react'
import NavBar from "../components/NavBar";
import './App.css';
import MainPage from "../components/MainPage";
import CrewmemberList from '../components/CrewList/CrewmemberList';




function App() {

  return (
    <div>
      <NavBar />
      <CrewmemberList />
      <MainPage />
     
    </div>
  )
}

export default App
