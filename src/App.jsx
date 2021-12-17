import { useState } from 'react'
import NavBar from "../components/NavBar";
import './App.css';
import MainPage from "../components/MainPage";
import GridBody from "../components/GridBody/GridBody";
function App() {

  return (
    <div>
      <NavBar />
      <MainPage />
      <br />
      <GridBody />
    </div>
  )
}

export default App
