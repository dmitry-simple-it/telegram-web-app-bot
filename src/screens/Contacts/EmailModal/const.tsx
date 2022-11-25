import { ListMenuItem } from '../../../components/ListMenu/types';
import customToast from '../../../components/CustomToast';
import CopyIcon from '../../../assets/copy.svg?react';
import EnvelopeIcon from '../../../assets/envelope.svg?react';
import { themeParams } from '../../../components/Telegram';

const emailToastID = 'emailToastID';

export const emailModalList: Array<ListMenuItem> = [
  {
    text: 'Отправить письмо',
    icon: (props) => <EnvelopeIcon {...props} fill={themeParams.linkColor} />,
    onClick: () => {
      window.open(`${process.env.SITE_URL}/email.html`, '_blank');
    },
  },
  {
    text: 'Копировать',
    icon: (props) => <CopyIcon {...props} fill={themeParams.linkColor} />,
    onClick: async () => {
      await navigator.clipboard.writeText('hello@simple-it.pro');
      customToast({ text: 'Email скопирован', toastId: emailToastID });
    },
  },
];
