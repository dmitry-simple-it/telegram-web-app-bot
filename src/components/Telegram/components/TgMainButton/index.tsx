import { FC, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { tgWebApp } from '../../core/tgWebApp';
import { themeParams } from '../../themeParams';
import { TgContext } from '../../context';

type MainButtonProps = {
  onClick: () => void;
  text: string;
  color?: string;
  textColor?: string;
  progress?: boolean;
  active?: boolean;
};

const TgMainButton: FC<MainButtonProps> = ({
  text,
  onClick,
  textColor = themeParams.buttonTextColor,
  color = themeParams.buttonColor,
  progress = false,
  active = true,
}) => {
  const { addMainButton, removeMainButton } = useContext(TgContext);

  useEffect(() => {
    const id = uuidv4();
    addMainButton(id);

    return () => {
      removeMainButton(id);
    };
  }, [addMainButton, removeMainButton]);

  useEffect(() => {
    if (progress) tgWebApp.MainButton.showProgress();
    else tgWebApp.MainButton.hideProgress();
  }, [progress]);

  useEffect(() => {
    tgWebApp.MainButton.setParams({
      is_active: active,
      text_color: textColor,
      text,
      color,
    });
  }, [active, textColor, color, text]);

  useEffect(() => {
    tgWebApp.MainButton.onClick(onClick);

    return () => {
      tgWebApp.MainButton.offClick(onClick);
    };
  }, [onClick]);

  return null;
};

export default TgMainButton;
