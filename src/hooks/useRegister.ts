import { registerUser } from "../api/auth";
import { RegisterForm } from "../types/Form";


const useRegister = () => {
  const register = async (registerForm: RegisterForm) => {
    const { user } = await registerUser(registerForm);
    console.log("registered user:", user);
  }

  return {
    register
  }
}

export default useRegister;