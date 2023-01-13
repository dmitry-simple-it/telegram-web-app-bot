import { FC } from 'react';

import GeneralServiceDescription from '../GeneralServiceDescription';
import { prototypingMessages } from './const';

const PrototypingServicesDescription: FC = () => (
  <GeneralServiceDescription messages={prototypingMessages} />
);

export default PrototypingServicesDescription;
