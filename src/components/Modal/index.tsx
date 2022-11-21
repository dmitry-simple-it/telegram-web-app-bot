import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import classes from './style.module.scss';

type ModalProps = {
  open?: boolean;
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
}) => {
  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLElement;
    const modalWrapper = (event.currentTarget as HTMLDivElement)
      .firstChild as HTMLDivElement;
    if (!modalWrapper.contains(target)) onClose();
  };

  if (!open) return null;

  return createPortal(
    <div className={classes.modal_overlay} onClick={handleOverlayClick}>
      <div className={classes.modal_wrapper}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;
