import { FC } from 'react';

import classes from './style.module.scss';

type InvisibleInputProps = {
  id: string;
};

const InvisibleInput: FC<InvisibleInputProps> = ({ id }) => (
  <input
    type="text"
    className={classes.invisibleInput}
    tabIndex={-1}
    value=""
    onChange={() => {}}
    data-inv-id={id}
  />
);

export default InvisibleInput;
