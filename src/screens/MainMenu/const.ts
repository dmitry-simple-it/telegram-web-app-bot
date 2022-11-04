import PaperPlane from '../../assets/paper-plane.svg?react';
import PhoneCall from '../../assets/phone-call.svg?react';
import Play from '../../assets/play.svg?react';
import Briefcase from '../../assets/briefcase.svg?react';

import { ReactSVGComponent } from '../../types/types';

type MenuItemType = {
  icon: string | ReactSVGComponent;
  label: string;
  route: string;
};

export const menuItems: Array<MenuItemType> = [
  {
    icon: PaperPlane,
    label: 'Оставить заявку',
    route: '/contact_form',
  },
  {
    icon: PhoneCall,
    label: 'Связаться',
    route: '/contact',
  },
  {
    icon: Play,
    label: 'Поиграться',
    route: '/play',
  },
  {
    icon: Briefcase,
    label: 'Наши услуги',
    route: '/services',
  },
];
