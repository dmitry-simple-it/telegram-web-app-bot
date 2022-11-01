import { FC, useMemo } from 'react';

import classes from './style.module.scss';

type LoadingIndicatorProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
};

const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  size = 40,
  strokeWidth = 6,
  color = '#3cbcd5',
}) => {
  const style = useMemo(() => {
    const correctedSize = size < 16 ? 16 : size;
    return {
      width: correctedSize,
      height: correctedSize,
      borderWidth: strokeWidth,
      borderColor: `${color} transparent transparent transparent`,
    };
  }, [size]);

  return (
    <div className={classes.ldsRing} style={style}>
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
    </div>
  );
};

export default LoadingIndicator;
