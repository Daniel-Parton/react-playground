import React from "react";
import classNames from "classnames";
import Portlet from "./index";
import PortletHeader from "./portlet-header";
import PortletHeaderActions from "./portlet-header-actions";
import PortletBody from "./portlet-body";

interface PortletSimpleProps {
  id?: string
  headerText: string
  className?: string
  hasTable?: boolean
}

const PortletSimple: React.FC<PortletSimpleProps> = ({ hasTable, className, children, headerText, ...rest }) => {

  const classes = classNames({
    'has-table': hasTable,
    [className!]: className !== undefined
  });

  return (
    <Portlet className={classes} {...rest}>
      <PortletHeader headerText={headerText}>
        <PortletHeaderActions />
      </PortletHeader>
      <PortletBody>
        {children}
      </PortletBody>
    </Portlet>
  );
};

export default PortletSimple