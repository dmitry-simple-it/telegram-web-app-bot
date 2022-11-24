import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTgMainButton } from '../../utils/hooks/tgMainButton';
import { useTgBackButton } from '../../utils/hooks/tgBackButton';
import { WebApp } from '../../utils/tgWebApp';
import AnimatedReactLogo from '../../components/AnimatedReactLogo';

import './style.scss';

const Play: FC = () => {
  const navigate = useNavigate();

  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  useTgBackButton(navigateBack);
  useTgMainButton({ text: 'Вернуться в основное меню', onClick: navigateBack });

  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <div className="placeholder-screen">
      <AnimatedReactLogo />
    </div>
  );
};

export default Play;
