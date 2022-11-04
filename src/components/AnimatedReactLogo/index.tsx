import { FC, MouseEventHandler } from 'react';

import ReactLogoSvg from '../../assets/react-logo.svg?react';
import classes from './style.module.scss';
import { WebApp } from '../../utils/tgWebApp';
import { animateParticles } from './utils';

type AnimatedReactLogoProps = {
  color?: string;
};

const AnimatedReactLogo: FC<AnimatedReactLogoProps> = ({
  color = WebApp.themeParams.link_color || '#3cbcd5',
}) => {
  const handleClick: MouseEventHandler<SVGElement> = (event) => {
    animateParticles(
      event,
      'symbol',
      WebApp.themeParams.link_color || '#3cbcd5',
    );
  };

  return (
    <ReactLogoSvg
      className={classes.reactLogo}
      onClick={handleClick}
      fill={color}
      stroke={color}
      data-type="square"
    />
  );
};

export default AnimatedReactLogo;
