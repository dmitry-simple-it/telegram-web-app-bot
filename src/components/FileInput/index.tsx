import {
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';

import ClipSvg from '../../assets/clip.svg?react';
import classes from './style.module.scss';
import LoadingIndicator from '../LoadingIndicator';
import { WebApp } from '../../utils/tgWebApp';

type FileInputProps = {
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, error, className, ...props }, ref) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const readerRef = useRef<FileReader>(new FileReader());

    const handleFileSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
      const filesList = event.target.files;
      if (!filesList?.length) return;

      const file = filesList.item(0);
      if (!file) return;

      readerRef.current.readAsDataURL(file);

      onChange && onChange(event);
      setFile(file);
    };

    useEffect(() => {
      const loadStartHandler = () => setLoading(true);
      const loadEndHandler = () => setLoading(false);

      readerRef.current.addEventListener('loadstart', loadStartHandler);
      readerRef.current.addEventListener('loadend', loadEndHandler);

      return () => {
        readerRef.current.removeEventListener('loadstart', loadStartHandler);
        readerRef.current.removeEventListener('loadend', loadEndHandler);
      };
    }, [onChange]);

    return (
      <label className={classNames(classes.fileInput, className)}>
        <input
          className={classes.fileInput_input}
          type="file"
          autoComplete="off"
          {...props}
          ref={ref}
          disabled={loading}
          multiple={false}
          onChange={handleFileSelect}
        />
        <ClipSvg
          className={classes.fileInput_clip}
          fill={WebApp.themeParams.link_color || '#33bcd7'}
        />
        {loading && (
          <div className={classes.fileInput_spinnerWrapper}>
            <LoadingIndicator
              size={16}
              strokeWidth={2}
              color={WebApp.themeParams.link_color}
            />
          </div>
        )}
        {!loading && (
          <span className={classes.fileInput_text}>
            {file ? file.name : 'Прикрепите файл с дополнительной информацией'}
          </span>
        )}
        {error && <div className={classes.fileInput_error}>{error}</div>}
      </label>
    );
  },
);

export default FileInput;
