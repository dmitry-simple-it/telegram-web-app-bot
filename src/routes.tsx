import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router/dist/lib/context';

import MainMenu from './screens/MainMenu';
import ContactForm from './screens/ContactForm';
import Contacts from './screens/Contacts';
import Play from './screens/Play';
import Services from './screens/Services';
import { MobileServicesDescription } from './screens/ServicesDescription';
import TelegramServicesDescription from './screens/ServicesDescription/TelegramServicesDescription';
import WebServicesDescription from './screens/ServicesDescription/WebServicesDescription';
import OutstaffServicesDescription from './screens/ServicesDescription/OutstaffServicesDescription';

export const routes: Array<RouteObject> = [
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
    path: 'services',
    children: [
      {
        path: '',
        element: <Services />,
      },
      {
        path: 'mobile',
        element: <MobileServicesDescription />,
      },
      {
        path: 'telegram',
        element: <TelegramServicesDescription />,
      },
      {
        path: 'web',
        element: <WebServicesDescription />,
      },
      {
        path: 'outstaff',
        element: <OutstaffServicesDescription />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];
