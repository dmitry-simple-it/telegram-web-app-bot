import { FC } from 'react';
import classNames from 'classnames';

import classes from '../style.module.scss';

type DotProps = {
  active: boolean;
};

const Dot: FC<DotProps> = ({ active }) => (
  <div
    className={classNames(classes.progressDots_dot, {
      [classes.progressDots_dot__active]: active,
    })}
  />
);

export default Dot;
