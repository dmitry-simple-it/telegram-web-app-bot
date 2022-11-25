import { FC, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { tgWebApp } from '../../core/tgWebApp';
import { TgContext } from '../../context';

type TelegramBackButtonProps = {
  onClick: () => void;
};

const TgBackButton: FC<TelegramBackButtonProps> = ({ onClick }) => {
  const { addBackButton, removeBackButton } = useContext(TgContext);

  useEffect(() => {
    const id = uuidv4();
    addBackButton(id);
    return () => removeBackButton(id);
  }, [addBackButton, removeBackButton]);

  useEffect(() => {
    tgWebApp.BackButton.onClick(onClick);

    return () => {
      tgWebApp.BackButton.offClick(onClick);
    };
  }, [onClick]);

  return null;
};

export default TgBackButton;
