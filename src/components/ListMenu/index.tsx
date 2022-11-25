import { FC, useMemo } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';
import { ListMenuItem } from './types';

type ListMenuProps = {
  items: Array<ListMenuItem>;
};

const ListMenu: FC<ListMenuProps> = ({ items }) => {
  const isWithImages = useMemo(() => {
    return items.some((item) => item.icon);
  }, [items]);

  return (
    <ul className={classes.listMenu}>
      {items.map(({ ...item }, index) => (
        <li
          key={item.key || index}
          onClick={item.onClick}
          className={classes.listMenu_item}
        >
          {item.icon ? (
            typeof item.icon === 'string' ? (
              <img
                src={item.icon}
                alt="List item"
                className={classes.listMenu_item_img}
              />
            ) : (
              <item.icon
                width={20}
                height={20}
                className={classes.listMenu_item_img}
              />
            )
          ) : (
            <div
              className={classNames({
                [classes.listMenu_item_img]: isWithImages,
              })}
            />
          )}
          <div className={classes.listMenu_item_text}>{item.text}</div>
        </li>
      ))}
    </ul>
  );
};

export default ListMenu;
