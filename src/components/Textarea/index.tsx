import { forwardRef, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

type TextareaProps = {
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className={classes.textarea}>
        <textarea
          className={classNames(className, classes.textareaInput)}
          ref={ref}
          {...props}
        />
        {error && <div className={classes.textareaError}>{error}</div>}
      </div>
    );
  },
);

export default Textarea;
