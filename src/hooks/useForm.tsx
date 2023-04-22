//import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Form, FormErrors, GliderInputEvent, SubmitCallback } from "../types/Form";
import { Accessor, Component, For, ParentComponent, Show } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      validate: Validator[];
    }
  }
}

type Validator = (element: HTMLInputElement, ...rest: any[]) => string;

export const FormError: ParentComponent = (props) => {
  const mesgs = () => props.children as string[] || [];
  
  return (
    <Show when={mesgs().length > 0}>
      <div class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
        <For each={mesgs()}>
          {(error) =>
            <div>
              {error}
            </div>
          }
        </For>
      </div>
    </Show>
  )
}

export const requiredValidator: Validator = (element: HTMLInputElement) => {
  return element.value.length === 0 ?
    `${element.name} is required` : "";
}

export const minLengthValidator: Validator = (element: HTMLInputElement, minLength = 7) => {
  if (
    element.value.length === 0 ||
    element.value.length > minLength
    ) { return ""; }

  return `${element.name} should be more than ${minLength} characters`;
}

export const maxLengthValidator: Validator = (element: HTMLInputElement, maxLength = 7) => {
  if (
    element.value.length === 0 ||
    element.value.length < maxLength
  ) { return ""; }

  return `${element.name} should be less than ${maxLength} characters`;
}


export const firstUppercaseLetter = (element: HTMLInputElement) => {
  const { value } = element;

  if (value.length === 0) { return ""; }

  return value[0] !== value[0].toLocaleUpperCase() ?
    `${element.name} first letter should be uppercased` : "";
}


const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore(initialForm);

  const [errors, setErrors] = createStore<FormErrors>();
  //errors are key-value pairs

  const handleInput = (e: GliderInputEvent) => {
    const { name, value } = e.currentTarget;
    setForm(
      name as any,
      value as any
    );
    //setForm(name as keyof RegisterForm, value);
    // setForm({
    //   ...form(),
    //   [name]: value
    // })
    //console.log(form())
  }

  //a function to return a function
  const submitForm = (submitCallback: SubmitCallback<T>) => () => {
    console.log("submitForm:", form);
    submitCallback(form);
  }

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    //const value = accessor();
    //console.log(value);
    const validators = accessor() || [];
    //debugger //confirm the arguments in devtool > Scope > validators

    // ref.onblur = () => {
    //   console.log("On Blur!");
    // }
    ref.onblur = checkValidity(ref, validators)

    // ref.oninput = () => {
    //   console.log("On Input!");
    // }
    //console.log(ref);
  }

  const checkValidity = (element: HTMLInputElement, validators: Validator[]) => () => {
    console.log("checkValidity");
    setErrors(element.name, []);

    for (const validator of validators) {
      const message = validator(element);

      if (!!message) {
        setErrors(produce(errors => {
          errors[element.name].push(message);
        }));
      }
      //   setErrors(element.name, message);
      // } else {
      //   setErrors(element.name, "");
      // }
    }
    console.log(JSON.stringify(errors));
  }


  return {
    handleInput,
    submitForm,
    validate,
    errors
    //count,
    // increaseCount, 
    // decreaseCount,
    // funnyFunction: () => {
    //   console.log("I am funny. hahaha")
    // }
  }
}

export default useForm;
  /*
const [count, setCount] = createSignal(100);

onMount(() => {
console.log("useForm mounted");
})

onCleanup(() => {
console.log("useForm cleaned-up");
})

createEffect(() => {
console.log(count());
})

const increaseCount = () => {
setCount(count() + 1);
}

const decreaseCount = () => {
setCount(count() - 1);
}*/