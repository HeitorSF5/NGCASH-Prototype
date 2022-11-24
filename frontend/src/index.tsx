import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
// ! is a Non null assertion
// https://www.folkstalk.com/2022/09/how-to-use-typescript-on-createroot-with-code-examples.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
