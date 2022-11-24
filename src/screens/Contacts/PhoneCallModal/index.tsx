import { FC } from 'react';

import Modal from '../../../components/Modal';
import ListMenu from '../../../components/ListMenu';
import { phoneModalList } from './const';

type PhoneCallModalProps = {
  open: boolean;
  onClose: () => void;
};

const PhoneCallModal: FC<PhoneCallModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ListMenu items={phoneModalList} />
    </Modal>
  );
};

export default PhoneCallModal;
