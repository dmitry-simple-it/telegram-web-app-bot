import {
  ChangeEventHandler,
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

type TextareaProps = {
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, onChange, className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const errorMessageRef = useRef<HTMLDivElement | null>(null);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      onChange && onChange(event);
      event.target.style.height = '1px';
      event.target.style.height = event.target.scrollHeight + 'px';
      if (errorMessageRef.current)
        errorMessageRef.current.style.top =
          6 + event.target.scrollHeight + 'px';
    };

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = '1px';
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 'px';
        if (errorMessageRef.current)
          errorMessageRef.current.style.top =
            6 + textareaRef.current.scrollHeight + 'px';
      }
    }, []);

    return (
      <div className={classes.textarea}>
        <textarea
          className={classNames(className, classes.textarea_input)}
          ref={(node) => {
            textareaRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          onChange={handleChange}
          {...props}
        />
        {error && (
          <div ref={errorMessageRef} className={classes.textarea_error}>
            {error}
          </div>
        )}
      </div>
    );
  },
);

export default TextArea;
