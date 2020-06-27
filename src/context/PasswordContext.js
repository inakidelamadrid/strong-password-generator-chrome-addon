import React, { useState } from 'react'
import generatePassword from '../service/Password'

const PasswordContext = React.createContext()
export const PasswordConsumer = PasswordContext.Consumer

export const PasswordProvider = ({ children }) => {
  const [password, ] = useState(generatePassword({length: 20}))


  return (
    <PasswordContext.Provider value={[password]}>
      {children}
    </PasswordContext.Provider>
  )
}

export default PasswordContext
