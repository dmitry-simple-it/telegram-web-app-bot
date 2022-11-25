import { FC, useEffect } from 'react';

import { tgWebApp } from '../../core/tgWebApp';
import { themeParams } from '../../themeParams';

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
  useEffect(() => {
    tgWebApp.MainButton.show();

    return () => {
      tgWebApp.MainButton.hide();
    };
  }, []);

  useEffect(() => {
    if (progress) tgWebApp.MainButton.showProgress();

    return () => {
      if (tgWebApp.MainButton.isVisible) tgWebApp.MainButton.hideProgress();
    };
  }, [progress]);

  useEffect(() => {
    tgWebApp.MainButton.setParams({
      is_active: active,
      text_color: textColor,
      text,
      color,
    });

    return () => {
      tgWebApp.MainButton.setParams({
        is_active: true,
        text_color: themeParams.buttonTextColor,
        color: themeParams.buttonColor,
      });
    };
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
