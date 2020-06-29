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

  const [containsLower, setContainsLower] = useState(true)
  const [containsNumbers, setContainsNumbers] = useState(false)
  const [containsSymbols, setContainsSymbols] = useState(false)
  const [containsUpper, setContainsUpper] = useState(true)

  // I only send containsUpper because it's the only one overriding defaults
  const [password, setPassword] = useState(
    generatePassword({ containsUpper, length })
  )

  useEffect(() => {
    setPassword(
      generatePassword({
        containsUpper,
        containsNumbers,
        containsSymbols,
        length,
      })
    )
  }, [length, containsUpper, containsNumbers, containsSymbols])

  const regeneratePassword = () => {
    setPassword(
      generatePassword({
        containsLower,
        containsNumbers,
        containsSymbols,
        containsUpper,
        length,
      })
    )
  }

  const setContextSelectedTypes = (typesArray) => {
    const params = reduce(
      typesArray,
      (acc, charType) => ({ [mapCharTypeToParam(charType)]: true, ...acc }),
      {}
    )
    // regenerate password
    setPassword(generatePassword({ ...params, length }))

    // and now modify state so that calls containing nothing or only the length,
    // regenerate the password accordingly
    typesArray.forEach((charType) => {
      const setter = {
        lowercase: setContainsLower,
        uppercase: setContainsUpper,
        numbers: setContainsNumbers,
        symbols: setContainsSymbols,
      }[charType]
      setter(true)
    })
  }

  return (
    <PasswordContext.Provider
      value={{
        password,
        regeneratePassword,
        setContextSelectedTypes,
        setPasswordLength,
      }}
    >
      {children}
    </PasswordContext.Provider>
  )
}

export default PasswordContext
