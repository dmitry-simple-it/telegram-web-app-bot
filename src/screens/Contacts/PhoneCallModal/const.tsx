import { ListMenuItem } from '../../../components/ListMenu/types';
import { themeParams } from '../../../components/Telegram';
import customToast from '../../../components/CustomToast';
import PhoneIcon from '../../../assets/phone.svg?react';
import PhoneCallIcon from '../../../assets/phone-call.svg?react';
import VideoCameraIcon from '../../../assets/video-camera.svg?react';
import CopyIcon from '../../../assets/copy.svg?react';

const phoneToastID = 'phoneToastID';

export const phoneModalList: Array<ListMenuItem> = [
  {
    text: 'Звонок через Telegram',
    icon: (props) => <PhoneIcon {...props} fill={themeParams.linkColor} />,
    onClick: () => {
      window.open('https://telegram.me/SimpleIT_Devs?voicechat');
    },
  },
  {
    text: 'Видеозвонок через Telegram',
    icon: (props) => (
      <VideoCameraIcon {...props} fill={themeParams.linkColor} />
    ),
    onClick: () => {
      window.open('https://telegram.me/SimpleIT_Devs?videochat');
    },
  },
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
      await navigator.clipboard.writeText('+74991137631');
      customToast({
        text: 'Номер телефона скопирован',
        toastId: phoneToastID,
      });
    },
  },
];
