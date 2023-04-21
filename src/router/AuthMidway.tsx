import { Outlet, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { useAuthState } from "../context/auth";

const AuthMidway: Component = () => {  
  const authState = useAuthState()!;
  const navigate = useNavigate();
  
  onMount(() => {
    console.log("AuthMidway is mounted");
    if (authState.isAuthenticated) {
      console.log("authenticated yes -> re-route to /");
      navigate("/", {replace: true});
    }
  })

  return <Outlet />;
}


export default AuthMidway;