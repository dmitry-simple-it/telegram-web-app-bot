import { FC } from 'react';

import GeneralServiceDescription from '../GeneralServiceDescription';
import { telegramMessages } from './const';

const TelegramServicesDescription: FC = () => (
  <GeneralServiceDescription messages={telegramMessages} />
);

export default TelegramServicesDescription;
