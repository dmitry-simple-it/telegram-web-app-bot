import { FC } from 'react';

import { ReactSVGComponent } from '../../../types/types';

type ServicesListProps = {
  Icon: string | ReactSVGComponent;
  text: string;
  onClick?: () => void;
};

const ServicesListItem: FC<ServicesListProps> = ({
  Icon,
  text,
  onClick = () => {},
}) => {
  return (
    <div className="our-services_list_item" onClick={onClick}>
      {typeof Icon === 'string' ? (
        <img src={Icon} alt="list-item-icon" />
      ) : (
        <Icon />
      )}
      <p>{text}</p>
    </div>
  );
};

export default ServicesListItem;
