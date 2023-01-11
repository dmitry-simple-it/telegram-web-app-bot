import { FC } from 'react';

import GeneralServiceDescription from '../GeneralServiceDescription';
import { webMessages } from './const';

const WebServicesDescription: FC = () => (
  <GeneralServiceDescription messages={webMessages} />
);

export default WebServicesDescription;
