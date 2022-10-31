import PhoneHandset from '../../assets/phone_handset.png';
import PlayIcon from '../../assets/play_icon.png';
import TelegramLogo from '../../assets/telegram_logo.png';
import ToolsetIcon from '../../assets/toolset_icon.png';

type MenuItemType = {
  icon: string;
  label: string;
  route: string;
};

export const menuItems: Array<MenuItemType> = [
  {
    icon: TelegramLogo,
    label: 'Оставить заявку',
    route: '/contact_form',
  },
  {
    icon: PhoneHandset,
    label: 'Связаться',
    route: '/',
  },
  {
    icon: PlayIcon,
    label: 'Поиграться',
    route: '/',
  },
  {
    icon: ToolsetIcon,
    label: 'Наши услуги',
    route: '/',
  },
];
