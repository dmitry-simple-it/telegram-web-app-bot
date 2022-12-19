import { FC } from 'react';

import GeneralServiceDescription from '../GeneralServiceDescription';
import { mobileMessages, mobileMessagesTypes } from './const';

const MobileServicesDescription: FC = () => (
  <GeneralServiceDescription
    messages={mobileMessages}
    messageTypes={mobileMessagesTypes}
  />
);

export default MobileServicesDescription;
