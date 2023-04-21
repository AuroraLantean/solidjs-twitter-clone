import { Accessor, createContext, createSignal, onCleanup, onMount, ParentComponent, Setter, Show, useContext } from "solid-js"
import { createStore } from "solid-js/store";
import Loader from "../components/utils/Loader";

type AuthStateContextValues = {
  isAuthenticated: boolean;
  loading: boolean;
  //testFunction: () => string;
  //isAuthenticated: Accessor<boolean>;
}

const initialState = () => ({
  isAuthenticated: false,
  loading: true
})

const AuthStateContext = createContext<AuthStateContextValues>();

const AuthProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore(initialState());

    onMount(async () => {
      console.log("auth: Initializing AuthProvider!");
      try {
        await authenticateUser();
      } catch(error: any) {
        console.log("authenticateUser:", error);
      } finally {
        setStore("loading", false);
      }
  })

  onCleanup(() => {
    console.log("auth: Cleaning-up AuthProvider!")
  })

  const authenticateUser = async () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        setStore("isAuthenticated", true);
        //res(true);
        rej("Ooopsie we got some problem here");
      }, 1000);
    })
  }

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