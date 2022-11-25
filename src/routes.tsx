import { Navigate } from 'react-router-dom';

import MainMenu from './screens/MainMenu';
import ContactForm from './screens/ContactForm';
import Contacts from './screens/Contacts';
import Play from './screens/Play';

interface IRoute {
  path: string;
  element: JSX.Element;
}

export const routes: Array<IRoute> = [
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: '/contact_form',
    element: <ContactForm />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
  },
  {
    path: '/play',
    element: <Play />,
  },
  {
    path: '/services',
    element: <Play />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];
