import { createContext, createUniqueId, ParentComponent, useContext } from "solid-js"
import { createStore, produce } from "solid-js/store";

export type SnackbarData = {
  message: string;
  type: "success" | "warning" | "error";
  id?: string;
}

type UIDispatch = {
  addSnackbar: (s: SnackbarData) => void;
  removeSnackbar: (id: string) => () => void;
}
const UIDispatchContext = createContext<UIDispatch>();

type UIState = {
  snackbars: SnackbarData[]
}
const UIStateContext = createContext<UIState>();

const defaultState = (): UIState => ({
  snackbars: []
})

const UIProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<UIState>(defaultState());

  const addSnackbar = (snackbar: SnackbarData) => {
    setStore("snackbars", produce((snackbars) => {
      snackbars.push({
        id: createUniqueId(),
        ...snackbar
      });
    }))
  }

  const removeSnackbar = (id: string) => () => {
    setStore("snackbars", produce(snackbars => {
      const index = snackbars.findIndex((snackbar) => snackbar.id === id);
      if (index > -1) {
        snackbars.splice(index, 1);
      }
    }))
  }

  return (
    <UIStateContext.Provider value={store}>
      <UIDispatchContext.Provider value={{
        addSnackbar,
        removeSnackbar
      }}>
        {props.children}
      </UIDispatchContext.Provider>
    </UIStateContext.Provider>
  )
}

export const useUIState = () => useContext(UIStateContext)!;
export const useUIDispatch = () => useContext(UIDispatchContext)!;

export default UIProvider;