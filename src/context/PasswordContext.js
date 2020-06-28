import React, { useEffect, useState } from 'react'
import { INITIAL_PASSWORD_LENGTH } from '../globals'
import generatePassword from '../service/Password'

const PasswordContext = React.createContext()
export const PasswordConsumer = PasswordContext.Consumer

export const PasswordProvider = ({ children }) => {
  const [length, setPasswordLength] = useState(INITIAL_PASSWORD_LENGTH)
  const [password, setPassword] = useState(generatePassword({ length }))

  useEffect(() => {
    setPassword(generatePassword({ length }))
  }, [length])

  return (
    <PasswordContext.Provider value={{ password, setPasswordLength }}>
      {children}
    </PasswordContext.Provider>
  )
}

export default PasswordContext
