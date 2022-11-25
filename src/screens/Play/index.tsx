import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AnimatedReactLogo from '../../components/AnimatedReactLogo';
import {
  TgBackButton,
  TgMainButton,
  tgWebApp,
} from '../../components/Telegram';

import './style.scss';

const Play: FC = () => {
  const navigate = useNavigate();

  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    tgWebApp.expand();
  }, []);

  return (
    <div className="placeholder-screen">
      <AnimatedReactLogo />
      <TgBackButton onClick={navigateBack} />
      <TgMainButton onClick={navigateBack} text="Вернуться в основное меню" />
    </div>
  );
};

export default Play;
