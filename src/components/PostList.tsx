import { For } from "solid-js";
import PostItem from "./PostItem";
import classes from 'PostList.module.css';

function PostList(props: { value: number }) {
  //"DO NOT DESTRUCTURE THE PROPS BCOS IT WILL LOSE REACTIVITY!"

  return (
    <ul class={classes.list}>
      <For each={props.posts}>
        {(post, index) => <PostItem id={post.id} title={post.title} />}
      </For>
    </ul>
  );
}

export default PostList;