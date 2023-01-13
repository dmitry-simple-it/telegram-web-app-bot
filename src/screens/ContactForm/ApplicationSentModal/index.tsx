import { FC } from 'react';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

type ApplicationSentModalProps = {
  open: boolean;
  onClose: () => void;
};

const ApplicationSentModal: FC<ApplicationSentModalProps> = ({
  open,
  onClose,
}) => (
  <Modal open={open} onClose={onClose} className="application-sent-modal">
    <h3>Спасибо за заявку!</h3>
    <p>
      Скоро мы с вами свяжемся чтобы обсудить подробнее детали вашего проекта
    </p>
    <Button onClick={onClose}>Вернуться к форме</Button>
  </Modal>
);

export default ApplicationSentModal;
