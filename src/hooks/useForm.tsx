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

type Validator = (element: HTMLInputElement, ...rest: any[]) => (form: Form) => string;
type ValidatorConfig = {element: HTMLInputElement, validators: Validator[]};

const niceName = (text: string) => {
  const words = text.split(/(?=[A-Z])/);

  return (words.map((word, i) => {
    // if (i === 0) {
    //   return word[0].toUpperCase() + word.substring(1);
    // }
    // return word.toLowerCase();
    return word[0].toUpperCase() + word.substring(1);
  })).join(" ");
}


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

export const compareWith: Validator = (element: HTMLInputElement, tofieldName: string) => (form: Form) => {
  if (element.value.length === 0) { return ""};

  const compareToValue = form[tofieldName];
  console.log("ele value:", element.value, ", compareToValue:", compareToValue)
  return element.value !== compareToValue ? 
  `${niceName(element.name)} should be same as ${niceName(tofieldName)}` : "";
}

export const requiredValidator: Validator = (element: HTMLInputElement) => (form: Form) => {
  console.log("requiredValidator: form:", form)
  return element.value.length === 0 ?
    `${niceName(element.name)} is required` : "";
}

export const minLengthValidator: Validator = (element: HTMLInputElement, minLength = 7) => (form: Form) => {
  if (
    element.value.length === 0 ||
    element.value.length >= minLength
    ) { return ""; }

  return `${niceName(element.name)} should be more than ${minLength} characters`;
}

export const maxLengthValidator: Validator = (element: HTMLInputElement, maxLength = 7) => (form: Form) => {
  if (
    element.value.length === 0 ||
    element.value.length <= maxLength
  ) { return ""; }

  return `${niceName(element.name)} should be less than ${maxLength} characters`;
}


export const firstUppercaseLetter = (element: HTMLInputElement) => (form: Form) => {
  const { value } = element;

  if (value.length === 0) { return ""; }

  return value[0] !== value[0].toLocaleUpperCase() ?
    `${niceName(element.name)} first letter should be uppercased` : "";
}


const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore(initialForm);

  const [errors, setErrors] = createStore<FormErrors>();
  //errors are key-value pairs
  const validatorFields: {[key: string]: ValidatorConfig} = {};

  const isValid = () => {
    const keys = Object.keys(errors);
    if (keys.length === 0) {
      return false;
    }
    //if there is any error, return false
    return !keys.some(errorKey => {
      return errors[errorKey].length > 0;
    });
  } 

  const handleInput = (e: GliderInputEvent) => {
    const { name, value } = e.currentTarget;
    console.log("handleInput", name, value);
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
    for (const field in validatorFields) {
      const config = validatorFields[field];
      checkValidity(config)();
    }
    if (isValid()) {
      console.log("all validators passed")
      submitCallback(form);
    } else {
      console.log("the form has error")
    }
  }

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    //const value = accessor();
    //console.log(value);
    const validators = accessor() || [];
    //debugger //confirm the arguments in devtool > Scope > validators

    // ref.onblur = () => {
    //   console.log("On Blur!");
    // }
    let config: ValidatorConfig;
    //debugger //confirm devtool > Sources > local: ref and validators > click on triangle button or F8 > type "validatorFields" in the console to see more fields are added as you click on the triangle button button
    validatorFields[ref.name] = config = {element: ref, validators};

    ref.onblur = checkValidity(config);
    ref.oninput = () => {
      if (!errors[ref.name]) { return; }
      checkValidity(config)();
    }
    // ref.oninput = () => {
    //   console.log("On Input!");
    // }
    //console.log(ref);
  }
  const checkValidity = ({element, validators}: ValidatorConfig) => () => {
    //console.log("checkValidity");
    setErrors(element.name, []);

    for (const validator of validators) {
      const message = validator(element)(form);

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
    //console.log(JSON.stringify(errors));
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