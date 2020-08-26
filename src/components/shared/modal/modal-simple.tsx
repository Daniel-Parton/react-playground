import React from "react";
import classNames from "classnames";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

interface ModalSimpleProps {
  header?: string
  open?: boolean
  onClose: () => void
  className?: string
}

const ModalSimple: React.FC<ModalSimpleProps> = ({ open, header, onClose, className, children, ...rest }) => {

  const classes = classNames({
    'simple-modal': true,
    [className!]: className !== undefined
  });

  const handleToggle = () => {
    if (open && onClose) onClose();
  }

  return (
    <Modal centered isOpen={open} toggle={handleToggle} className={classes}>
      <ModalHeader toggle={handleToggle}>{header}</ModalHeader>
      <ModalBody className='w-100'>
        {children}
      </ModalBody>
    </Modal>

  );
}

export default ModalSimple;