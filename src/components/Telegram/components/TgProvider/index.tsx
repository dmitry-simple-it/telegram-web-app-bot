import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

import { TgContext } from '../../context';
import {
  tgButtonsReducer,
  addBackButton as addBackButtonAC,
  removeBackButton as removeBackButtonAC,
  addMainButton as addMainButtonAC,
  removeMainButton as removeMainButtonAC,
} from './reducer';
import { tgWebApp } from '../../core/tgWebApp';

const TgProvider: FC<PropsWithChildren> = ({ children }) => {
  const [buttonsData, dispatch] = useReducer(tgButtonsReducer, {
    backButtons: [],
    mainButtons: [],
  });

  const addBackButton = useCallback(
    (id: string) => {
      dispatch(addBackButtonAC(id));
    },
    [dispatch],
  );

  const removeBackButton = useCallback(
    (id: string) => {
      dispatch(removeBackButtonAC(id));
    },
    [dispatch],
  );

  const addMainButton = useCallback(
    (id: string) => {
      dispatch(addMainButtonAC(id));
    },
    [dispatch],
  );

  const removeMainButton = useCallback(
    (id: string) => {
      dispatch(removeMainButtonAC(id));
    },
    [dispatch],
  );

  useEffect(() => {
    if (buttonsData.backButtons.length > 0 && !tgWebApp.BackButton.isVisible) {
      tgWebApp.BackButton.show();
    }
    if (buttonsData.backButtons.length === 0 && tgWebApp.BackButton.isVisible) {
      tgWebApp.BackButton.hide();
    }
  }, [buttonsData.backButtons]);

  useEffect(() => {
    if (buttonsData.mainButtons.length > 0 && !tgWebApp.MainButton.isVisible) {
      tgWebApp.MainButton.show();
    }
    if (buttonsData.mainButtons.length === 0 && tgWebApp.MainButton.isVisible) {
      tgWebApp.MainButton.hide();
    }
  }, [buttonsData.mainButtons]);

  return (
    <TgContext.Provider
      value={{
        ...buttonsData,
        addBackButton,
        removeBackButton,
        addMainButton,
        removeMainButton,
      }}
    >
      {children}
    </TgContext.Provider>
  );
};

export default TgProvider;
