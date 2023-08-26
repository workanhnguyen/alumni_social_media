import React from "react";

import { ROLE_LECTURER } from "../../constants/role";
import { SignInForm } from "../../components";

const LecturerLogin = () => {
  return <SignInForm role={ROLE_LECTURER} />;
};

export default LecturerLogin;
