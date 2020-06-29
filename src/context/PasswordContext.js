import React, { useEffect, useState } from 'react'
import reduce from 'lodash/reduce'
import { INITIAL_PASSWORD_LENGTH } from '../globals'
import generatePassword from '../service/Password'

const mapCharTypeToParam = (charType) => {
  return {
    lowercase: 'containsLower',
    uppercase: 'containsUpper',
    numbers: 'containsNumbers',
    symbols: 'containsSymbols',
  }[charType]
}
const PasswordContext = React.createContext()

export const PasswordConsumer = PasswordContext.Consumer

export const PasswordProvider = ({ children }) => {
  const [length, setPasswordLength] = useState(INITIAL_PASSWORD_LENGTH)
  const [containsUpper] = useState(true)

  const [password, setPassword] = useState(
    generatePassword({ containsUpper, length })
  )

  useEffect(() => {
    setPassword(generatePassword({ containsUpper, length }))
  }, [length, containsUpper])

  const setContextSelectedTypes = (typesArray) => {
    const params = reduce(
      typesArray,
      (acc, charType) => ({ [mapCharTypeToParam(charType)]: true, ...acc }),
      {}
    )
    setPassword(generatePassword({ ...params, length }))
  }

  return (
    <PasswordContext.Provider
      value={{ password, setContextSelectedTypes, setPasswordLength }}
    >
      {children}
    </PasswordContext.Provider>
  )
}

export default PasswordContext
