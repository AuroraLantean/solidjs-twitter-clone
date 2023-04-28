import { Component, For } from "solid-js";
import { createStore } from "solid-js/store";
import MainLayout from "./MainLayout";
import GlidePost from "../components/glides/GlidePost";
import { Glide } from "../types/Glide";
import pageSize from "../reactive/pageSize";
import Messenger from "../components/utils/Messenger";

const lg = console.log;

const HomeScreen: Component = () => {
  //const {addSnackbar} = useUIDispatch();
  //const [content, setContent] = createSignal("");
  const [glides, setGlides] = createStore({
    items: [] as Glide[]
  });

  console.log("HomeScreen pageSize" + JSON.stringify(pageSize.getter()));

  /*const makeGlide = () => {
    console.log("makeGlide():", content())
    const glide = {
      id: createUniqueId(),
      content: content(),
      user: {
        nickName: "Filip99",
        avatar: "https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
      },
      likesCount: 0,
      subglidesCount: 0,
      date: new Date()
    }
    // setGlides("items", produce((items) => {
    //   //items.push(glide);
    //   items.unshift(glide);
    // }));
    addSnackbar({message: "Glide Added!", type: "success"});
    setContent("");
    //lg(JSON.stringify(glides()));
  }*/


  return (
    <MainLayout>
      <Messenger />
      <div class="h-px bg-gray-700 my-1" />

      {/* GlidePosts */}
      <For each={glides.items}>
        {(glide) =>
          <GlidePost glide={glide} />
        }
      </For>
    </MainLayout>
  );
};

export default HomeScreen;
/**
  const [displayContent, setDisplayContent] = createSignal(false);

      <button 
        onClick={() => {setDisplayContent(!displayContent())}}>
        Toggle Content
      </button>
      <Show
        when={displayContent()}
        fallback={<GoodbyeComponent />}
      >
        <HelloWorld />
      </Show>
 */