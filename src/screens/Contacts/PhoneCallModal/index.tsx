import { FC } from 'react';

import Modal from '../../../components/Modal';
import ListMenu from '../../../components/ListMenu';
import { ListMenuItem } from '../../../components/ListMenu/types';

type PhoneCallModalProps = {
  open: boolean;
  onClose: () => void;
};

const list: Array<ListMenuItem> = [
  {
    text: 'Звонок через Telegram',
    onClick: () => {
      window.open('https://telegram.me/SimpleIT_Devs');
    },
  },
  {
    text: 'Видеозвонок через Telegram',
    onClick: () => {
      window.open('https://telegram.me/SimpleIT_Devs');
    },
  },
  {
    text: 'Позвонить',
    onClick: () => {
      window.open(`${process.env.SITE_URL}/phone.html`, '_blank');
    },
  },
  {
    text: 'Копировать',
    onClick: () => {
      navigator.clipboard.writeText('+74991137631');
    },
  },
];

const PhoneCallModal: FC<PhoneCallModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ListMenu items={list} />
    </Modal>
  );
};

export default PhoneCallModal;
