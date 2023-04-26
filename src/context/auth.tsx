import { createContext, onCleanup, onMount, ParentComponent, Show, useContext } from "solid-js"
import { useLocation, useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { getUser } from "../api/auth";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../components/utils/Loader";
import { firebaseAuth } from "../db";
import { User } from "../types/User";

type AuthStateContextValues = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null
  //testFunction: () => string;
  //isAuthenticated: Accessor<boolean>;
}

const initialState = () => ({
  isAuthenticated: false,
  loading: true,
  user: null
})

const AuthStateContext = createContext<AuthStateContextValues>();

const AuthProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<AuthStateContextValues>(initialState());
  const location = useLocation();
  const navigate = useNavigate();

  onMount(() => {
    console.log("Initializing AuthProvider!");
    setStore("loading", true);
    listenToAuthChanges();
  })
  const listenToAuthChanges = () => {
    onAuthStateChanged(firebaseAuth, async (db_user) => {
      //debugger
      if (!!db_user) {
        const gliderUser = await getUser(db_user.uid);
        setStore("isAuthenticated", true);
        setStore("user", gliderUser)

        if (location.pathname.includes("/auth")) {
          navigate("/", {replace: true});
        }
      } else {
        setStore("isAuthenticated", false);
        setStore("user", null);
      }
      setStore("loading", false);
    })
  }
  /*onMount(async () => {
      console.log("Initializing AuthProvider!");
      try {
        await authenticateUser();
        setStore("isAuthenticated", true);
      } catch(error: any) {
        console.log("authenticateUser:", error);
        setStore("isAuthenticated", false);
      } finally {
        setStore("loading", false);
      }
  })
    const authenticateUser = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(true);
        reject("not authenticated");
      }, 1000);
    })
  }
  */
  onCleanup(() => {
    console.log("auth: Cleaning-up AuthProvider!")
  })


  return (
    <AuthStateContext.Provider value={store}>
      <Show
        when={store.loading}
        fallback={props.children}
      >
        <Loader size={100} />
      </Show>
    </AuthStateContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext);

export default AuthProvider;