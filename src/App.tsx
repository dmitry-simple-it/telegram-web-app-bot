import { FC } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MainMenu from './screens/MainMenu';
import ContactForm from './screens/ContactForm';

import './style.scss';

const App: FC = () => {
  const location = useLocation();

  return (
    <TransitionGroup className="app-wrapper">
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<MainMenu />} />
          <Route path="/contact_form" element={<ContactForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
