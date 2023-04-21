import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";

import HomeScreen from "../screens/Home";
import MainMidway from "./MainMidway";
import AuthMidway from "./AuthMidway";

const LoginScreen = lazy(() => import("../screens/Login"));
const RegisterScreen = lazy(() => import("../screens/Register"));

/* Route -> Authenticator -> Loading:
# "/" -> MainMidway to check auth -> HomeScreen OR re-route to AuthMidway
# "/auth/* " -> AuthMidway to check auth -> HomeScreen OR LoginScreen OR RegisterScreen
*/
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" component={MainMidway}>
        <Route path="" component={HomeScreen} />
      </Route>

      <Route path="/auth" component={AuthMidway}>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;