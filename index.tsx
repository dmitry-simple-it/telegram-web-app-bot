import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './style.scss';
import App from './src/App';
import { TgProvider } from './src/components/Telegram';

const rootElem = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(rootElem);
root.render(
  <BrowserRouter>
    <TgProvider>
      <App />
    </TgProvider>
  </BrowserRouter>,
);
