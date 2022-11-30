import { ListMenuItem } from '../../../components/ListMenu/types';
import { themeParams } from '../../../components/Telegram';
import PhoneCallIcon from '../../../assets/phone-call.svg?react';
import CopyIcon from '../../../assets/copy.svg?react';
import customToast from '../../../components/CustomToast';
import { isMobileOrTablet } from '../../../utils/isMobileOrTablet';

const phoneCopiedToastID = 'phoneCopiedToastID';

export const invInputId = 'phone_modal_inv';

export const phoneModalList: Array<ListMenuItem> = [
  {
    text: 'Позвонить',
    icon: (props) => <PhoneCallIcon {...props} fill={themeParams.linkColor} />,
    onClick: () => {
      window.open(`${process.env.SITE_URL}/phone.html`, '_blank');
    },
  },
  {
    text: 'Копировать',
    icon: (props) => <CopyIcon {...props} fill={themeParams.linkColor} />,
    onClick: async () => {
      if (isMobileOrTablet) {
        const input = document.querySelector(
          `[data-inv-id="${invInputId}"]`,
        ) as HTMLInputElement | undefined;
        if (!input) return;
        input.value = '+74991137631';
        input.select();
        input.setSelectionRange(0, 99999);
        document.execCommand('copy');
      } else {
        await navigator.clipboard.writeText('+74991137631');
      }
      customToast({
        text: 'Номер телефона скопирован',
        toastId: phoneCopiedToastID,
      });
    },
  },
];
