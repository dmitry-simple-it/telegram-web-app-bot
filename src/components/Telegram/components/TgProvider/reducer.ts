import { Reducer } from 'react';

const ADD_BACK_BUTTON = 'ADD_BACK_BUTTON';
const REMOVE_BACK_BUTTON = 'REMOVE_BACK_BUTTON';
const ADD_MAIN_BUTTON = 'ADD_MAIN_BUTTON';
const REMOVE_MAIN_BUTTON = 'REMOVE_MAIN_BUTTON';

export type AddBackButton = { type: typeof ADD_BACK_BUTTON; id: string };
export type RemoveBackButton = { type: typeof REMOVE_BACK_BUTTON; id: string };
export type AddMainButton = { type: typeof ADD_MAIN_BUTTON; id: string };
export type RemoveMainButton = { type: typeof REMOVE_MAIN_BUTTON; id: string };

export const addBackButton = (id: string): AddBackButton => ({
  type: ADD_BACK_BUTTON,
  id,
});
export const removeBackButton = (id: string): RemoveBackButton => ({
  type: REMOVE_BACK_BUTTON,
  id,
});
export const addMainButton = (id: string): AddMainButton => ({
  type: ADD_MAIN_BUTTON,
  id,
});
export const removeMainButton = (id: string): RemoveMainButton => ({
  type: REMOVE_MAIN_BUTTON,
  id,
});

export type TgButtonsActions =
  | AddBackButton
  | RemoveBackButton
  | AddMainButton
  | RemoveMainButton;

export type TgButtonsReducerType = {
  backButtons: Array<string>;
  mainButtons: Array<string>;
};

export const tgButtonsReducer: Reducer<
  TgButtonsReducerType,
  TgButtonsActions
> = (state, action) => {
  switch (action.type) {
    case ADD_BACK_BUTTON:
      return { ...state, backButtons: [...state.backButtons, action.id] };
    case REMOVE_BACK_BUTTON:
      return {
        ...state,
        backButtons: (() => {
          const foundIndex = state.backButtons.findIndex(
            (backButton) => backButton === action.id,
          );
          return [
            ...state.backButtons.slice(0, foundIndex),
            ...state.backButtons.slice(foundIndex + 1),
          ];
        })(),
      };
    case ADD_MAIN_BUTTON:
      return { ...state, mainButtons: [...state.mainButtons, action.id] };
    case REMOVE_MAIN_BUTTON:
      return {
        ...state,
        mainButtons: (() => {
          const foundIndex = state.mainButtons.findIndex(
            (mainButton) => mainButton === action.id,
          );
          return [
            ...state.mainButtons.slice(0, foundIndex),
            ...state.mainButtons.slice(foundIndex + 1),
          ];
        })(),
      };
    default:
      return state;
  }
};
