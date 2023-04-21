/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import App from './App';
import './index.css';
import AuthProvider from "./context/auth";

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() =>
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>, root!);
