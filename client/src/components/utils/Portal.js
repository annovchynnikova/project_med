import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMemoOne } from 'use-memo-one';

const portalRoot = document.querySelector('#portal-root');

const Portal = ({ children }) => {
  const el = useMemoOne(
    () => document.createElement('div'),
    []
  );

  useEffect(() => {
    portalRoot.appendChild(el);

    return () => {
      portalRoot.removeChild(el);
    }
  }, []);

  return createPortal(children, el);
};

export default Portal;
