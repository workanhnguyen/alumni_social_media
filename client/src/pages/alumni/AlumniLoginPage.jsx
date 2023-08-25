import React from "react";

import { ROLE_ALUMNI } from "../../constants/role";
import { PageException, SignInForm } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { ALREADY_LOGIN } from "../../constants/common";

const AlumniLogin = () => {
  const { token } = useStateContext();

  return <>{token? <PageException type={ALREADY_LOGIN} /> : <SignInForm role={ROLE_ALUMNI} />}</>;
};

export default AlumniLogin;
