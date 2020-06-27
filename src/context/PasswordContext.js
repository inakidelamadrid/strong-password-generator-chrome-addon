import React from 'react'

const PasswordContext = React.createContext()
export const PasswordProvider = PasswordContext.Provider
export const PasswordConsumer = PasswordContext.Consumer

export default PasswordContext
