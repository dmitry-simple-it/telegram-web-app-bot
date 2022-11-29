import { ListMenuItem } from '../../../components/ListMenu/types';
import { themeParams } from '../../../components/Telegram';
import EnvelopeIcon from '../../../assets/envelope.svg?react';
import CopyIcon from '../../../assets/copy.svg?react';
import customToast from '../../../components/CustomToast';

const emailCopiedToastID = 'emailCopiedToastID';

export const invInputId = 'email_modal_inv';

export const emailModalList: Array<ListMenuItem> = [
  {
    text: 'Отправить письмо',
    icon: (props) => <EnvelopeIcon {...props} fill={themeParams.linkColor} />,
    onClick: () => {
      window.open(`${process.env.SITE_URL}/email.html`, '_blank');
    },
  },
  {
    text: 'Скопировать',
    icon: (props) => <CopyIcon {...props} fill={themeParams.linkColor} />,
    onClick: () => {
      const input = document.querySelector(`[data-inv-id="${invInputId}"]`) as
        | HTMLInputElement
        | undefined;
      if (!input) return;
      input.value = 'hello@simple-it.pro';
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand('copy');
      customToast({
        text: 'Email скопирован',
        toastId: emailCopiedToastID,
      });
    },
  },
];
