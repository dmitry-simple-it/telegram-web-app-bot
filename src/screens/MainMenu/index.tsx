import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { menuItems } from './const';
import MenuItem from './MenuItem';
import { tgWebApp } from '../../components/Telegram';

import './style.scss';

const MainMenu: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    tgWebApp.expand();
  }, []);

  return (
    <div className="screen main-menu">
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
