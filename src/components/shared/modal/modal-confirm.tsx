import React from "react";
import classNames from "classnames";
import { ModalSimple, Button } from "../index";

interface ModalConfirmProps {
  header?: string
  open?: boolean
  onClose: () => void
  className?: string
  onConfirm: () => void
  bodyText?: string
  yesText?: string
  noText?: string

}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ className, onConfirm, onClose, bodyText, yesText, noText, children, ...rest }) => {

  const classes = classNames({
    'modal-confirm': true,
    [className!]: className !== undefined
  });

  return (
    <ModalSimple onClose={onClose} className={classes} {...rest}>
      {bodyText && <p className='text-center'>{bodyText}</p>}
      {children}
      <div className='mt-2'>
        <Button className='w-100 mb-2' onClick={onConfirm} bsVariant='primary'>{yesText || 'Yes'}</Button>
        <Button className='w-100' bsVariant='secondary' onClick={onClose}>{noText || 'No'}</Button>
      </div>
    </ModalSimple>
  );
}

export default ModalConfirm;