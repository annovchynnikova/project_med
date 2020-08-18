import { useState } from 'react';

const useModalState = (initialState) => {
  const [opened, setOpened] = useState(initialState);

  return {
    opened,
    open: () => setOpened(true),
    close: () => setOpened(false),
    toggle: () => setOpened(o => !o)
  };
};

export default useModalState;
