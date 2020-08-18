import React from 'react';
import Portal from '../utils/Portal';

const Modal = ({ state, children, style }) => {
  return state.opened && (
    <Portal>
      <div
        className="modal-container"
      >
        <div
          className="modal-background"
          onClick={state.close}
        />
        <div
          className="modal"
          {...{ style }}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
