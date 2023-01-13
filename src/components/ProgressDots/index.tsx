import { FC, useMemo } from 'react';

import Dot from './Dot';
import classes from './style.module.scss';

type ProgressDotsProps = {
  dotsNum: number;
  activeDot: number;
};

const ProgressDots: FC<ProgressDotsProps> = ({ dotsNum, activeDot }) => {
  const dotsArray = useMemo(() => Array.from({ length: dotsNum }), [dotsNum]);

  return (
    <div className={classes.progressDots}>
      {dotsArray.map((_, index) => (
        <Dot key={index} active={activeDot === index} />
      ))}
    </div>
  );
};

export default ProgressDots;
