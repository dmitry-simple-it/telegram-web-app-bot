import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { menuItems } from './const';
import MenuItem from './MenuItem';

import './style.scss';

const MainMenu: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-menu">
      {menuItems.map((item, index) => (
        <MenuItem
          Icon={item.icon}
          label={item.label}
          key={index}
          onClick={() => {
            navigate(item.route);
          }}
        />
      ))}
    </div>
  );
};

export default MainMenu;
