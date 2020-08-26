import classNames from 'classnames';
import React, { useState } from 'react';
import Button, { ButtonProps } from './button';
import ModalConfirm from '../modal/modal-confirm';

interface ButtonConfirmProps extends ButtonProps {
  onConfirm: () => void
  modalHeader?: string
  modalBodyText?: string
  modalYesText?: string
  modalNoText?: string
  modalBody?: any
  modalClassName?: string
}

const ButtonConfirm: React.FC<ButtonConfirmProps> = ({ className, onConfirm, onClick, modalHeader,
  modalBodyText, modalYesText, modalNoText, modalBody, modalClassName, ...rest }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const classes = classNames({
    'btn-confirm': true,
    [className!]: className !== undefined
  });

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setModalOpen(false);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) onClick(e);
    setModalOpen(true);
  }

  return (
    <React.Fragment>
      <Button onClick={handleClick} className={classes} {...rest} />
      <ModalConfirm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        header={modalHeader}
        bodyText={modalBodyText}
        noText={modalNoText}
        yesText={modalYesText}
        className={modalClassName}
      >
        {modalBody}
      </ModalConfirm>
    </React.Fragment>
  );
}

export default ButtonConfirm;