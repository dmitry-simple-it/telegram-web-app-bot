import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './style.css';
import App from './src/App';

const rootElem = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(rootElem);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
