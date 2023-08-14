import React from 'react'

import { ROLE_ALUMNI } from '../../constants/Role';
import { SignIn } from '../../components';

const AlumniLogin = () => {
  return (
    <SignIn role={ROLE_ALUMNI} />
  );
}

export default AlumniLogin