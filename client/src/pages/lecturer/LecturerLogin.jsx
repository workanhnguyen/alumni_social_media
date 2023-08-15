import React from 'react'

import { ROLE_LECTURER } from '../../constants/Role'
import { SignInForm } from '../../components'

const LecturerLogin = () => {
  return (
    <SignInForm role={ROLE_LECTURER} />
  )
}

export default LecturerLogin