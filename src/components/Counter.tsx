function Counter(props: { value: number }) {
  //"DO NOT DESTRUCTURE THE PROPS BCOS IT WILL LOSE REACTIVITY!"
  //props.children ... to show all content between opening and closing of component tags
  return (
  <p id="counter">
    Counter: {props.value}
  </p>
  );
}

export default Counter;