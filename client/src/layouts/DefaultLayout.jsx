import React from 'react'
import { Header } from '../components'

const DefaultLayout = ({ children }) => {
  return (
    <div>
        <Header />
        {children}
    </div>
   
  )
}

export default DefaultLayout