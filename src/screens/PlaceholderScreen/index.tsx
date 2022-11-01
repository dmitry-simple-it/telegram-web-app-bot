import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReactLogo from '../../assets/react-logo.png';
import { useTgMainButton } from '../../utils/hooks/tgMainButton';
import { useTgBackButton } from '../../utils/hooks/tgBackButton';
import { WebApp } from '../../utils/tgWebApp';

import './style.scss';

const PlaceholderScreen: FC = () => {
  const navigate = useNavigate();

  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  useTgBackButton(navigateBack);
  useTgMainButton({ text: 'Вернуться в основное меню', onClick: navigateBack });

  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <div className="placeholder-screen">
      <img
        className="placeholder-screen_react-logo"
        src={ReactLogo}
        alt="react logo"
      />
    </div>
  );
};

export default PlaceholderScreen;
