import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  TgBackButton,
  TgMainButton,
  tgWebApp,
} from '../../components/Telegram';

import './style.scss';
import Canvas2D from '../../classes/Canvas2D';
import CanvasReactLogo from '../../classes/CanvasReactLogo';
import ReactLogoSvg from '../../assets/react-logo.svg';

const Play: FC = () => {
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleBackClick = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    tgWebApp.expand();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const context2d = canvasRef.current.getContext('2d');
    if (!context2d) return;
    const canvas2d = new Canvas2D(context2d);
    canvas2d
      .addDrawable(CanvasReactLogo, {
        imagePath: ReactLogoSvg,
        position: { x: '50%', y: '50%' },
        size: '25%',
        rotationSpeed: 1,
      })
      .run();
    return () => {
      canvas2d.dispose();
    };
  }, []);

  return (
    <div className="play-screen">
      <canvas
        ref={canvasRef}
        width="100%"
        height="100%"
        style={{ width: '100%', height: '100%' }}
      />
      <TgBackButton onClick={handleBackClick} />
      <TgMainButton
        onClick={handleBackClick}
        text="Вернуться в основное меню"
      />
    </div>
  );
};

export default Play;
