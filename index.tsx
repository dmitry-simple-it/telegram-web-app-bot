import React from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';

const rootElem = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(rootElem);
root.render(<h3>Hello there</h3>);
