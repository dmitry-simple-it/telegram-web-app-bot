import { cloneElement, FC, ReactElement, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MainMenu from './screens/MainMenu';
import ContactForm from './screens/ContactForm';
import PlaceholderScreen from './screens/PlaceholderScreen';

import './style.scss';

const blankScreens = ['/contact', '/play', '/services'];

const App: FC = () => {
  const location = useLocation();

  const cssTransitionClassNames = useMemo(() => {
    if (location.pathname !== '/')
      return {
        exit: 'fade-exit',
        exitActive: 'fade-exit-active',
        enter: 'transform-enter',
        enterActive: 'transform-enter-active',
      };

    return {
      exit: 'transform-exit',
      exitActive: 'transform-exit-active',
      enter: 'fade-enter',
      enterActive: 'fade-enter-active',
    };
  }, [location.pathname]);

  const childFactory = useCallback(
    (child: ReactElement) =>
      cloneElement(child, {
        classNames: cssTransitionClassNames,
        timeout: 300,
      }),
    [cssTransitionClassNames],
  );

  return (
    <TransitionGroup className="app-wrapper" childFactory={childFactory}>
      <CSSTransition
        key={location.pathname}
        classNames={cssTransitionClassNames}
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<MainMenu />} />
          <Route path="/contact_form" element={<ContactForm />} />
          {blankScreens.map((screen) => (
            <Route key={screen} path={screen} element={<PlaceholderScreen />} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
