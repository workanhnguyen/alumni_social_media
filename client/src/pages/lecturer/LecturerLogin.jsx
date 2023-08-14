import React from 'react'

import { ROLE_LECTURER } from '../../constants/Role'
import { SignIn } from '../../components'

const LecturerLogin = () => {
  return (
    <SignIn role={ROLE_LECTURER} />
  )
}

export default LecturerLogin