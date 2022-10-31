import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

type TextInputProps = {
  error?: string;
  type?: 'text' | 'email' | 'password';
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className={classes.textInput}>
        <input
          className={classNames(className, classes.textInputInput)}
          autoComplete="off"
          {...props}
          ref={ref}
        />
        {error && <div className={classes.textInputError}>{error}</div>}
      </div>
    );
  },
);

export default TextInput;
