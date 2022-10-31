import { useEffect } from 'react';

import { WebApp } from '../tgWebApp';

export const useTgBackButton = (callback: () => void) => {
  const {
    onClick: onClickListener,
    offClick: offClickListener,
    ...backButtonProps
  } = WebApp.BackButton;

  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.isVisible = true;

    return () => WebApp.BackButton.hide();
  }, []);

  useEffect(() => {
    onClickListener(callback);

    return () => {
      offClickListener(callback);
    };
  }, [callback]);

  return backButtonProps;
};
