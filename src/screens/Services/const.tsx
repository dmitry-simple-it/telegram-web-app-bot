import { ReactSVGComponent } from '../../types/types';
import PaperPlaneIcon from '../../assets/paper-plane.svg?react';
import { themeParams } from '../../components/Telegram';

type ServiceItem = {
  icon: string | ReactSVGComponent;
  text: string;
  route: string;
};

export const servicesList: Array<ServiceItem> = [
  {
    icon: () => <PaperPlaneIcon fill={themeParams.linkColor} />,
    text: 'Разработка веб приложения',
    route: '/services/mobile',
  },
  {
    icon: () => <PaperPlaneIcon fill={themeParams.linkColor} />,
    text: 'Разработка мобильного приложения',
    route: '/services/mobile',
  },
  {
    icon: () => <PaperPlaneIcon fill={themeParams.linkColor} />,
    text: 'Разработка телеграм бота',
    route: '/services/mobile',
  },
  {
    icon: () => <PaperPlaneIcon fill={themeParams.linkColor} />,
    text: 'Outstaff',
    route: '/services/mobile',
  },
  {
    icon: () => <PaperPlaneIcon fill={themeParams.linkColor} />,
    text: 'Прототипирование',
    route: '/services/mobile',
  },
];
