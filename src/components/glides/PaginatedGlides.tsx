import { Accessor, Component, For, onCleanup, onMount, Show } from "solid-js";
import { Glide } from "../../types/Glide";
import GlidePost from "./GlidePost";
import { CenteredDataLoader } from "../utils/DataLoader";

type Props = {
  page: Accessor<number>;
  pages: {
    [key: string]: { glides: Glide[] }
  };
  loading: boolean;
  loadMoreGlides: () => Promise<void>
}
const PaginatedGlides: Component<Props> = (props) => {
  let lastItemRef: HTMLDivElement;

  onMount(() => {
    window.addEventListener("scroll", loadNewItems);
  })

  onCleanup(() => {
    window.removeEventListener("scroll", loadNewItems);
  })

  const loadNewItems = () => {
    //distance from lastItemRef to the moving top edge of window
    //window.innerHeigh is the height of the moving window
    if (lastItemRef.getBoundingClientRect().top <= window.innerHeight) {
      if (!props.loading) {
        console.log("Load new Items!");
        props.loadMoreGlides();
      }
    }
  }

  return (
    <>
      <For each={Array.from({ length: props.page() })}>
        {(_, i) =>
          <For each={props.pages[i() + 1]?.glides}>
            {(glide) =>
              <GlidePost glide={glide} />
            }
          </For>
        }
      </For>
      <Show when={props.loading}>
        <CenteredDataLoader />
      </Show>
      <div ref={lastItemRef!}></div>
      <div class="h-96"></div>
    </>
  )
}

export default PaginatedGlides;