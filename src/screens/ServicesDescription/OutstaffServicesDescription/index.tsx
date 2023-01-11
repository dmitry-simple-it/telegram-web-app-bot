import { FC } from 'react';

import GeneralServiceDescription from '../GeneralServiceDescription';
import { outstaffMessages } from './const';

const OutstaffServicesDescription: FC = () => (
  <GeneralServiceDescription messages={outstaffMessages} />
);

export default OutstaffServicesDescription;
