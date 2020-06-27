import React from 'react'
import { PasswordProvider } from './context/PasswordContext'
import './font-awesome-library'
import './App.css'

import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/NavBar'
import HomePage from './pages/HomePage'

import generatePassword from './service/Password'

function App() {
  return (
    <PasswordProvider
      value={{
        password: generatePassword({ containsUpper: true, length: 20 }),
      }}
    >
      <div className="App">
        <NavBar bg="primary" expand="lg" variant="dark">
          <NavBar.Brand href="#home">Iron Password</NavBar.Brand>
        </NavBar>
        <Container>
          <HomePage />
        </Container>
      </div>
    </PasswordProvider>
  )
}

export default App
