import { ReactSVGComponent } from '../../types/types';

export type ListMenuItem = {
  text: string;
  onClick: () => void;
  icon?: string | ReactSVGComponent;
  key?: string;
};
