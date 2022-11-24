import { toast, Slide, ToastOptions } from 'react-toastify';
import classNames from 'classnames';

import CopyIcon from '../../assets/copy.svg?react';
import { themeParams } from '../../utils/theme';
import classes from './style.module.scss';
import { ReactSVGComponent } from '../../types/types';

type CopiedToastType = {
  text: string;
  className?: string;
  bodyClassName?: string;
  Icon?: ReactSVGComponent;
} & Partial<Omit<ToastOptions, 'className' | 'bodyClassName'>>;

const customToast = ({
  text,
  Icon = CopyIcon,
  className,
  bodyClassName,
  ...options
}: CopiedToastType) =>
  toast(
    <>
      <Icon
        height={36}
        className={classes.toast__body__icon}
        fill={themeParams.linkColor}
      />{' '}
      <div>{text}</div>
    </>,
    {
      position: 'bottom-center',
      className: classNames(classes.toast, className),
      bodyClassName: classNames(classes.toast__body, bodyClassName),
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      autoClose: 1000,
      progress: 1,
      transition: Slide,
      ...options,
    },
  );

export default customToast;
