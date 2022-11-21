import { FC } from 'react';

import classes from './style.module.scss';
import { ListMenuItem } from './types';

type ListMenuProps = {
  items: Array<ListMenuItem>;
};

const ListMenu: FC<ListMenuProps> = ({ items }) => {
  return (
    <ul className={classes.listMenu}>
      {items.map((item, index) => (
        <li
          key={item.key || index}
          onClick={item.onClick}
          className={classes.listMenu_item}
        >
          <div className={classes.listMenu_item_text}>{item.text}</div>
        </li>
      ))}
    </ul>
  );
};

export default ListMenu;
