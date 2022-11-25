import { createContext } from 'react';

export interface ITgData {
  backButtons: Array<string>;
  mainButtons: Array<string>;
  addBackButton: (id: string) => void;
  removeBackButton: (id: string) => void;
  addMainButton: (id: string) => void;
  removeMainButton: (id: string) => void;
}

export const TgContext = createContext<ITgData>({
  backButtons: [],
  mainButtons: [],
  addBackButton: () => {},
  removeBackButton: () => {},
  addMainButton: () => {},
  removeMainButton: () => {},
});
