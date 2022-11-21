import { useCallback, useState } from 'react';

export const useSwitch = () => {
  const [isOpen, setOpenState] = useState(false);

  const open = useCallback(() => setOpenState(true), []);

  const close = useCallback(() => setOpenState(false), []);

  return [isOpen, open, close] as const;
};
