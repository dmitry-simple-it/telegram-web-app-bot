import { ButtonHTMLAttributes, FC } from 'react';

import classes from './style.module.scss';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

const Button: FC<ButtonProps> = ({ type = 'button', children, ...props }) => {
  return (
    <button className={classes.button} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
