import { FC } from 'react';

import { ReactSVGComponent } from '../../../types/types';
import { themeParams } from '../../../components/Telegram';

type MenuItemProps = {
  Icon: string | ReactSVGComponent;
  label: string;
  onClick: (id: string) => void;
};

const MenuItem: FC<MenuItemProps> = ({ Icon, label, onClick }) => (
  <div className="main-menu_item" onClick={() => onClick(label)}>
    {typeof Icon === 'string' ? (
      <img className="main-menu_item_image" src={Icon} alt={label} />
    ) : (
      <Icon className="main-menu_item_image" fill={themeParams.linkColor} />
    )}
    <div className="main-menu_item_text">{label}</div>
  </div>
);

export default MenuItem;
