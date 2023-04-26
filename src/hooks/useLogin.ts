
import { AuthForm } from "../types/Form";
import { login } from "../api/auth";

const useLogin = () => {
  const loginUser = (loginForm: AuthForm) => {
    console.log("useLogin loginForm:", JSON.stringify(loginForm))
    login(loginForm);
  }

  return {
    loginUser
  }
}

export default useLogin;