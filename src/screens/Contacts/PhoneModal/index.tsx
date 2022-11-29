import { FC } from 'react';

import Modal from '../../../components/Modal';
import ListMenu from '../../../components/ListMenu';
import { invInputId, phoneModalList } from './const';
import InvisibleInput from '../../../components/InvisibleInput';

type PhoneModalProps = {
  open: boolean;
  onClose: () => void;
};

const PhoneModal: FC<PhoneModalProps> = ({ open, onClose }) => (
  <Modal onClose={onClose} open={open}>
    <ListMenu items={phoneModalList} />
    <InvisibleInput id={invInputId} />
  </Modal>
);

export default PhoneModal;
