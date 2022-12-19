import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { servicesList } from './const';
import ServicesListItem from './ServicesListItem';

import './style.scss';
import { TgBackButton } from '../../components/Telegram';

const Services: FC = () => {
  const navigate = useNavigate();

  const handleListItemClick = (route: string) => () => navigate(route);

  const handleBackButtonClick = () => navigate(-1);

  return (
    <div className="screen our-services">
      <div className="our-services_list">
        {servicesList.map((serviceItem, index) => (
          <ServicesListItem
            key={index}
            text={serviceItem.text}
            Icon={serviceItem.icon}
            onClick={handleListItemClick(serviceItem.route)}
          />
        ))}
      </div>
      <TgBackButton onClick={handleBackButtonClick} />
    </div>
  );
};

export default Services;
