import {
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import classNames from 'classnames';

import ClipImage from '../../assets/clip.png';
import classes from './style.module.scss';

type FileInputProps = {
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ error, className, ...props }, ref) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
      const filesList = event.target.files;
      if (!filesList?.length) return;

      const file = filesList.item(0);
      if (!file) return;

      props.onChange && props.onChange(event);
      setFile(file);
    };

    return (
      <label className={classNames(classes.fileInput, className)}>
        <input
          className={classes.fileInputInput}
          type="file"
          autoComplete="off"
          {...props}
          ref={ref}
          multiple={false}
          onChange={handleFileSelect}
        />
        <img
          className={classes.fileInputClip}
          src={ClipImage}
          alt="Clip image"
        />
        <span className={classes.fileInputText}>
          {file ? file.name : 'Прикрепите файл с дополнительной информацией'}
        </span>
        {error && <div className={classes.fileInputError}>{error}</div>}
      </label>
    );
  },
);

export default FileInput;
