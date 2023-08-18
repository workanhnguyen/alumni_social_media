import React from 'react'

import { ROLE_ALUMNI } from '../../constants/Role';
import { SignInForm } from '../../components';

const AlumniLogin = () => {
  return (
    <SignInForm role={ROLE_ALUMNI} />
  );
}

export default AlumniLogin