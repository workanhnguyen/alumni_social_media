import React from "react";

import { useStateContext } from "../../contexts/ContextProvider";
import { AlreadyLogin, SignUpForm } from "../../components";
import PageException from "../../components/exceptions/PageException";

const AlumniRegister = () => {
  const { token } = useStateContext();
  return <>{token ? <SignUpForm /> : <PageException message='Bạn đã đăng nhập rồi!' />}</>;
};

export default AlumniRegister;
