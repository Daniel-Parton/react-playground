import React from "react";
import classNames from "classnames";

interface PortletHeaderProps extends React.HTMLProps<HTMLDivElement> {
  headerText?: string
}

const PortletHeader: React.SFC<PortletHeaderProps> = (props) => {
  const { className, headerText, ...rest } = props;

  const classes = classNames({
    'portlet-header': true,
    [className!]: className !== undefined
  });

  return (
    <React.Fragment>
      <div className={classes} {...rest} >
        {headerText && <h4 className='mb-0 d-inline-block'>{headerText}</h4>}
        {props.children}
      </div>
      <hr />
    </React.Fragment>
  );
};

export default PortletHeader;