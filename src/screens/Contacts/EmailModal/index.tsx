import { FC } from 'react';

import Modal from '../../../components/Modal';
import ListMenu from '../../../components/ListMenu';
import { emailModalList } from './const';
import { invInputId } from './const';
import InvisibleInput from '../../../components/InvisibleInput';

type EmailModalProps = {
  open: boolean;
  onClose: () => void;
};

const EmailModal: FC<EmailModalProps> = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <ListMenu items={emailModalList} />
    <InvisibleInput id={invInputId} />
  </Modal>
);

export default EmailModal;
