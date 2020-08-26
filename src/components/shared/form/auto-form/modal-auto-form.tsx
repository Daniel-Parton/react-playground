import React, { useState, useEffect } from "react";
import ModalSimple from "../../modal/modal-simple";
import AutoForm from "./auto-form";
import { AutoFormProps } from "./auto-form-types";

interface ModalAutoFormProps extends AutoFormProps {
  open?: boolean
  onClose: () => void
}

const ModalAutoForm: React.FC<ModalAutoFormProps> = (props) => {

  const { open, header, onClose, ...rest } = props;

  const [formKey, setFormKey] = useState(1);
  useEffect(() => {
    setFormKey(formKey + 1);
  }, [open])

  return (
    <ModalSimple header={header} open={open} onClose={onClose}>
      <AutoForm header={header} key={formKey} {...rest} />
    </ModalSimple>
  )
}

export default ModalAutoForm;