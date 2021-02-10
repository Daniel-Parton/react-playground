import React from "react";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import { usePortletContext } from ".";
import { Button } from "..";

interface PortletHeaderActionsProps extends React.HTMLProps<HTMLDivElement> {
  hideDropdown?: boolean
}

const PortletHeaderActions: React.SFC<PortletHeaderActionsProps> = ({ className, hideDropdown, children, ...rest }) => {

  const classes = classNames({
    'portlet-header-actions': true,
    [className!]: className !== undefined
  });

  const { toggleBody, bodyClosed } = usePortletContext();

  const buttonClasses = classNames({ 'rotate-180': bodyClosed });

  return (
    <div className={classes} {...rest} >
      {children}
      {!hideDropdown && (
        <Button
          onClick={() => toggleBody()}
          icon={FaChevronDown}
          variant='transparent'
          className={buttonClasses}
        />
      )}
    </div>
  );
};

export default PortletHeaderActions;