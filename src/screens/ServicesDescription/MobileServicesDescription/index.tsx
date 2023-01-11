import { FC } from 'react';

import GeneralServiceDescription from '../GeneralServiceDescription';
import { mobileMessages } from './const';

const MobileServicesDescription: FC = () => (
  <GeneralServiceDescription messages={mobileMessages} />
);

export default MobileServicesDescription;
