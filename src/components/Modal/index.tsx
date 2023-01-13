import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  TransitionEventHandler,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import classes from './style.module.scss';

type ModalProps = {
  onClose: () => void;
  className?: string;
  open?: boolean;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  className,
  onClose,
  children,
}) => {
  const [visible, setVisibility] = useState(open);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLElement;
    const modalWrapper = (event.currentTarget as HTMLDivElement)
      .firstChild as HTMLDivElement;
    if (!modalWrapper.contains(target)) onClose();
  };

  const handleOverlayTransitionEnd: TransitionEventHandler<
    HTMLDivElement
  > = () => {
    if (!open) setVisibility(false);
  };

  useEffect(() => {
    if (open) setTimeout(() => setVisibility(true));
  }, [open]);

  if (!(visible || open)) return null;

  return createPortal(
    <div
      className={classNames(classes.modal_overlay, {
        [classes.modal_overlay__visible]: visible && open,
      })}
      onTransitionEnd={handleOverlayTransitionEnd}
      onClick={handleOverlayClick}
    >
      <div className={classNames(classes.modal_wrapper, className)}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
