import { FC } from 'react';

import ListMenu from '../../../components/ListMenu';
import Modal from '../../../components/Modal';
import { emailModalList } from './const';

type EmailModalProps = {
  open: boolean;
  onClose: () => void;
};

const EmailModal: FC<EmailModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ListMenu items={emailModalList} />
    </Modal>
  );
};

export default EmailModal;
