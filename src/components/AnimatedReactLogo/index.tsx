import { FC, MouseEventHandler } from 'react';

import ReactLogoSvg from '../../assets/react-logo.svg?react';
import classes from './style.module.scss';
import { animateParticles } from './utils';
import { themeParams } from '../Telegram';

type AnimatedReactLogoProps = {
  color?: string;
};

const AnimatedReactLogo: FC<AnimatedReactLogoProps> = ({
  color = themeParams.linkColor,
}) => {
  const handleClick: MouseEventHandler<SVGElement> = (event) => {
    animateParticles(event, 'symbol', themeParams.linkColor);
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
