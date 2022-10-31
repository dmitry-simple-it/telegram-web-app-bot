import { useEffect } from 'react';

import { WebApp } from '../tgWebApp';

export const useTgMainButton = ({
  text,
  textColor = WebApp.themeParams.button_text_color,
  color = WebApp.themeParams.button_color,
  onClick,
}: {
  text: string;
  onClick: () => void;
  textColor?: string;
  color?: string;
}) => {
  const {
    onClick: onClickListener,
    offClick: offClickListener,
    ...mainButtonProps
  } = WebApp.MainButton;

  mainButtonProps.show();

  useEffect(() => {
    WebApp.MainButton.setText(text);
    WebApp.MainButton.show();
    WebApp.MainButton.setParams({
      color: color,
      text_color: textColor,
      is_visible: true,
      is_active: true,
    });
    return () => {
      WebApp.MainButton.hide();
    };
  }, []);

  useEffect(() => {
    onClickListener(onClick);
    return () => {
      offClickListener(onClick);
    };
  }, [onClick]);

  return mainButtonProps;
};
