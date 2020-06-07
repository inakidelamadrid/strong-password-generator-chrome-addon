import React from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from 'react-bootstrap/NavBar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <NavBar bg="primary" expand="lg" variant="dark">
        <NavBar.Brand href="#home">Iron Password</NavBar.Brand>
      </NavBar>
      <HomePage />
    </div>
  );
}

export default App;
