import React from 'react'
import { Header } from '../components'

const DefaultLayout = ({ children }) => {
  return (
    <>
        <Header />
        {children}
    </>
   
  )
}

export default DefaultLayout