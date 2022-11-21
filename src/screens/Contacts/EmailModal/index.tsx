import { FC } from 'react';
import ListMenu from '../../../components/ListMenu';
import Modal from '../../../components/Modal';
import { ListMenuItem } from '../../../components/ListMenu/types';

type EmailModalProps = {
  open: boolean;
  onClose: () => void;
};

const list: Array<ListMenuItem> = [
  {
    text: 'Отправить письмо',
    onClick: () => {
      window.open('mailto:hello@simple-it.pro');
    },
  },
  {
    text: 'Копировать',
    onClick: () => navigator.clipboard.writeText('hello@simple-it.pro'),
  },
];

const EmailModal: FC<EmailModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ListMenu items={list} />
    </Modal>
  );
};

export default EmailModal;
