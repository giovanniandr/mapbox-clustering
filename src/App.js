import './App.css';
import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Map from "./Map";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Map />
    </div>
  );
}



export default App;
