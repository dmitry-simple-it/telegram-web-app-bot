import { FC, useEffect } from 'react';

import { tgWebApp } from '../../core/tgWebApp';

type TelegramBackButtonProps = {
  onClick: () => void;
};

const TgBackButton: FC<TelegramBackButtonProps> = ({ onClick }) => {
  useEffect(() => {
    tgWebApp.BackButton.show();

    return () => tgWebApp.BackButton.hide();
  }, []);

  useEffect(() => {
    tgWebApp.BackButton.onClick(onClick);

    return () => {
      tgWebApp.BackButton.offClick(onClick);
    };
  }, [onClick]);

  return null;
};

export default TgBackButton;
