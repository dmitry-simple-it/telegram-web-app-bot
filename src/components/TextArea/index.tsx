import {
  ChangeEventHandler,
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useEffect,
  useState,
  FocusEventHandler,
} from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

const changeTextAreaStyles = ({
  textArea,
  label,
  error,
  changeLabel = true,
}: {
  textArea: HTMLTextAreaElement;
  label: HTMLLabelElement;
  error: HTMLDivElement | null;
  changeLabel?: boolean;
}) => {
  textArea.style.height = '1px';
  textArea.style.height = textArea.scrollHeight + 'px';

  if (changeLabel)
    label.style.transform = `translate(12px, ${-8 + textArea.scrollHeight}px)`;

  if (error) error.style.top = -8.5 + textArea.scrollHeight + 'px';
};

type TextareaProps = {
  label?: string;
  error?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'>;

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, label, onChange, onFocus, onBlur, className, ...props }, ref) => {
    const [isLabelDown, setLabelDown] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const errorMessageRef = useRef<HTMLDivElement | null>(null);
    const errorMessageWidth = errorMessageRef.current?.clientWidth;

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      onChange && onChange(event);

      if (textareaRef.current)
        changeTextAreaStyles({
          textArea: textareaRef.current,
          label: textareaRef.current?.nextSibling as HTMLLabelElement,
          error: errorMessageRef.current,
        });
    };

    const handleTextareaFocus: FocusEventHandler<HTMLTextAreaElement> = (
      event,
    ) => {
      if (textareaRef.current) {
        changeTextAreaStyles({
          textArea: textareaRef.current,
          label: textareaRef.current?.nextSibling as HTMLLabelElement,
          error: errorMessageRef.current,
        });
      }
      setLabelDown(true);
      onFocus && onFocus(event);
    };

    const handleTextareaBlur: FocusEventHandler<HTMLTextAreaElement> = (
      event,
    ) => {
      if (!textareaRef.current?.value) {
        setLabelDown(false);
        (textareaRef.current?.nextSibling as HTMLLabelElement).style.transform =
          'translate(12px, 18px)';
      }
      onBlur && onBlur(event);
    };

    const handleLabelClick = () => textareaRef.current?.focus();

    useEffect(() => {
      if (textareaRef.current?.value) setLabelDown(true);

      if (textareaRef.current) {
        changeTextAreaStyles({
          textArea: textareaRef.current,
          label: textareaRef.current?.nextSibling as HTMLLabelElement,
          error: errorMessageRef.current,
          changeLabel: !!textareaRef.current?.value,
        });
      }
    }, []);

    return (
      <div className={classNames(className, classes.textarea)}>
        <textarea
          className={classes.textarea_input}
          ref={(node) => {
            textareaRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          {...props}
          onChange={handleChange}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
        />
        <label
          className={classNames(classes.textarea_label, {
            [classes.textarea_label__floating]: isLabelDown,
          })}
          style={{
            width:
              isLabelDown && errorMessageWidth
                ? `calc(100% - ${errorMessageWidth + 28}px)`
                : 'unset',
          }}
          onClick={handleLabelClick}
        >
          {label}
        </label>
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
