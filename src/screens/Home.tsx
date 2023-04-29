import { Component, For } from "solid-js";
import MainLayout from "./MainLayout";
import GlidePost from "../components/glides/GlidePost";
import pageSize from "../reactive/pageSize";
import Messenger from "../components/utils/Messenger";
import useGlides from "../hooks/useGlides";
import PaginatedGlides from "../components/glides/PaginatedGlides";

const lg = console.log;

const HomeScreen: Component = () => {
  /*const [glides, setGlides] = createStore({
    items: [] as Glide[]
  });*/
  const {store, addGlideToFirst, page, loadGlides} = useGlides();

  console.log("HomeScreen pageSize" + JSON.stringify(pageSize.getter()));

  return (
    <MainLayout>
      <Messenger onGlideAdded={addGlideToFirst} />
      <div class="h-px bg-gray-700 my-1" />

      <PaginatedGlides 
        page={page}
        pages={store.pages}
        loading={store.loading}
        loadMoreGlides={loadGlides}
      />
    </MainLayout>
  );
};

export default HomeScreen;
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