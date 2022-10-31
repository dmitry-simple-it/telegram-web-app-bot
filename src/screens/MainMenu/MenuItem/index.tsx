import { FC } from 'react';

type MenuItemProps = {
  icon: string;
  label: string;
  onClick: (id: string) => void;
};

const MenuItem: FC<MenuItemProps> = ({ icon, label, onClick }) => (
  <div className="main-menu_item" onClick={() => onClick(label)}>
    <img className="main-menu_item_image" src={icon} alt={label} />
    <div className="main-menu_item_text">{label}</div>
  </div>
);

export default MenuItem;
