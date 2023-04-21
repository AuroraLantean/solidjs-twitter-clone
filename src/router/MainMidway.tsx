import { Outlet, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { useAuthState } from "../context/auth";

const MainMidway: Component = () => {  
  const authState = useAuthState()!;
  const navigate = useNavigate();
  
  onMount(() => {
    console.log("MainMidway is mounted");
    if (!authState.isAuthenticated) {
      console.log("authenticated: no -> re-route to /auth/login");
      navigate("/auth/login", {replace: true});
    }
  })
  
  if (!authState.isAuthenticated) { return null; }

  return <Outlet />;
}


export default MainMidway;