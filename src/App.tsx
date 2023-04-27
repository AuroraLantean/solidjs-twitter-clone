import { Component, createEffect, createResource, createSignal } from 'solid-js';
import SnackbarContainer from "./components/snackbar/Container";
import AppRoutes from "./router";
//import {useParams} from 'solid-start';

//import Header from './components/Header';
//import Counter from './components/Counter';

const lg = console.log;

const fetchJson = async (id: number) => {
  const resp = await fetch(`https://api.twitter.com/{id}`);
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(`Failed to fetch data from {id}`)
  }
  return data;
}
function SinglePost() {
  const params = { postId: 0 };//useParams();
  const [post] = createResource(fetchData.bind(null, params.postId));
  // post().title, post().body, ...
}

const fetchData = async (value: number) => {
  lg('fetchData1');
  const slow = await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  lg('fetchData2');
  return value;
}

const App: Component = () => {
  const [counter, setCounter] = createSignal(0);
  const doubleCounter = () => counter() * 2;
  //const authState = useAuthState()!;

  /* everyting here run only ONCE!*/
  // setInterval(() => {
  // 	setCounter(counter()+1);
  // }, 3000);

  /* to run everytime when the state is changed! */
  createEffect(() => {
    console.log("Effect: new counter:", counter());
    //fetch()...
  });

  return (
    <>
      <div id="popups" />
      <SnackbarContainer />
      <AppRoutes />
    </>
  );
};
/**
<>
      <div class="text-white">
        <div>
          Is Authenticated: {`${authState.isAuthenticated}`}
        </div>
        <div>
          Is Loading: {`${authState.loading}`}
        </div>
      </div>

      <h1 class="text-3xl font-bold underline">Hello World</h1>
      <p id="counter"> {counter()} </p>
      <p id="doublecounter"> {doubleCounter()} </p>
      <div id="actions">
        <button onclick={()=> setCounter(counter()-1)}> - </button>
        <br />
        <button onclick={()=> setCounter((prev) => prev+1)}> + </button>
      </div>
      <div id="actions-async">
        <p>Async</p>
        <button onclick={async()=> {
          const out = await fetchData(10);
          setCounter((prev) => prev+out)
        }}> + </button>
      </div>
  </>
 */

export default App;
// function resolve(resolve: (value: unknown) => void, reject: (reason?: any) => void): void {
//   throw new Error('Function not implemented.');
// }

