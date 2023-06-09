import { A } from "@solidjs/router";
import { Component } from "solid-js";
import useForm, { FormError, requiredValidator } from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import { AuthForm } from "../types/Form";
import pageSize from "../reactive/pageSize";

const LoginScreen: Component = () => {
  console.log("LoginScreen pageSize" + JSON.stringify(pageSize.getter()));
  const { authUser, loading } = useAuth("login");
  const { handleInput, submitForm, validate, errors } = useForm<AuthForm>({
    email: "",
    password: ""
  });

  const onFormSubmit = (form: AuthForm) => {
    console.log("onFormSubmit:", form);
    authUser(form);
  }
  const onKeyUpEnter = (e: KeyboardEvent) => {
    //console.log("onKeyUpEnter. e:", e);
    //e.preventDefault();
    if (e.key === "Enter" && !e.shiftKey) {
      console.log("Enter detected")
      document.getElementById("formBtn")!.click();
      //submitForm(onFormSubmit)
    }
  }

  return (
    <div class="flex-it justify-center items-center h-full">
      <div class="text-white text-4xl font-bold">Glider - Get In</div>
      <div class="mt-10 flex-it h-100 xs:w-100 w-full bg-white p-10 rounded-2xl">
        <div class="flex-it">
          <form class="flex-it">
            <div class="flex-it overflow-hidden sm:rounded-md">
              <div class="flex-it">
                <div class="flex-it">
                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      onInput={handleInput}
                      use: validate={[requiredValidator]}
                      type="email"
                      name="email"
                      id="email"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <FormError>{errors["email"]}</FormError>
                  </div>
                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      onInput={handleInput}
                      use: validate={[requiredValidator]}
                      onkeyup={(e) => onKeyUpEnter(e)}
                      type="password"
                      name="password"
                      id="password"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <FormError>{errors["password"]}</FormError>
                  </div>
                </div>
              </div>
              <div class="text-sm text-gray-600 pb-4">
                No Account Yet?{" "}
                <A class="underline" href="/auth/register">
                  Singup a new account
                </A>
              </div>
              <div class="flex-it py-2">
                <button
                  id="formBtn"
                  disabled={loading()}
                  onClick={submitForm(onFormSubmit)}
                  type="button"
                  class="
                  bg-blue-400 hover:bg-blue-500
                  inline-flex focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-400 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
