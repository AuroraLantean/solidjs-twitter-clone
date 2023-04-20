import { createRoot, createSignal, onCleanup, onMount } from "solid-js";

const getClientSize = () => ({
  height: document.body.clientHeight,
  width: document.body.clientWidth
})

const pageSize = () => {
  console.log("pageSize1")
  const [getter, setter] = createSignal(getClientSize());

  const handleResize = () => {
    setter(getClientSize());
    console.log("handleResize:", getter());
  }
  onMount(() => {
    console.log("INITIALIZING PAGESIZE!!!!!!");
    window.addEventListener("resize", handleResize);
  })
  console.log("pageSize2")
  onCleanup(() => {
    console.log("pageSize onCleanup")
  })
  console.log("pageSize3")

  const isXl = () => getter().width > 1280;
  const isLg = () => getter().width > 1024;

  return { getter, isXl, isLg };
  //return getter;//return function here, not to return func()!!!
}

export default createRoot(pageSize);