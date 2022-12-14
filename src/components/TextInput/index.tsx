import {
  FocusEventHandler,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';
import { useResize } from '../../utils/hooks/resize';

type TextInputProps = {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password';
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder'>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, onFocus, onBlur, error, className, ...props }, ref) => {
    const [isLabelDown, setLabelDown] = useState(false);
    const [errorDivWidth, setErrorDivWidth] = useState(-28);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useResize();

    const handleInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setLabelDown(true);
      onFocus && onFocus(event);
    };

    const handleInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      if (!inputRef.current?.value.trim()) setLabelDown(false);
      onBlur && onBlur(event);
    };

    const handleLabelClick = () => inputRef.current?.focus();

    useEffect(() => {
      inputRef.current?.value.trim() && setLabelDown(true);
    }, []);

    useEffect(() => {
      setErrorDivWidth(
        (inputRef.current?.nextSibling?.nextSibling as HTMLDivElement)
          ?.clientWidth || -28,
      );
    }, [error]);

    return (
      <div className={classNames(className, classes.textInput)}>
        <input
          className={classes.textInput_input}
          autoComplete="off"
          {...props}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
        />
        <label
          className={classNames(classes.textInput_label, {
            [classes.textInput_label__floating]: isLabelDown,
          })}
          style={{
            width:
              isLabelDown && errorDivWidth
                ? `calc(100% - ${errorDivWidth + 28}px)`
                : 'unset',
          }}
          onClick={handleLabelClick}
        >
          {label}
        </label>
        {error && <div className={classes.textInput_error}>{error}</div>}
      </div>
    );
  },
);

export default TextInput;
