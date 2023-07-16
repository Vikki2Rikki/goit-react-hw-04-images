import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalBlock } from './Modal.styled';
import React from 'react';

const Modal = ({ onCloseModal, largeImageURL }) => {
  useEffect(() => {
    const handleEsc = ({ code }) => {
      if (code === 'Escape') onCloseModal();
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onCloseModal]);

  const onClose = evt => {
    evt.currentTarget === evt.target && onCloseModal();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBlock>
        <img src={largeImageURL} alt="" />
      </ModalBlock>
    </Overlay>
  );
};

export default Modal;

Modal.propTypes = { onCloseModal: PropTypes.func };
