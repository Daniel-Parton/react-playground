import React from "react";
import classNames from "classnames";
import { Collapse } from "reactstrap";
import { usePortletContext } from ".";

interface PortletBodyProps extends React.HTMLProps<HTMLDivElement> {
}

const PortletBody: React.SFC<PortletBodyProps> = ({ className, children, ...rest }) => {
  const classes = classNames({
    'portlet-body': true,
    [className!]: className !== undefined
  });

  const { bodyClosed } = usePortletContext();


  return (
    <Collapse isOpen={!bodyClosed}>
      <div className={classes} {...rest} >
        {children}
      </div>
    </Collapse>
  );
};

export default PortletBody