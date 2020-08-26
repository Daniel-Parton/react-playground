import React from "react";
import classNames from "classnames";
import ReactJsPagination, { ReactJsPaginationProps } from "react-js-pagination";

interface PaginationProps extends ReactJsPaginationProps {
  className?: string
  leftContent?: any
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { className, leftContent, ...rest } = props;

  const classes = classNames({
    'pagination-container': true,
    [className!]: className !== undefined
  });

  return (
    <div className={classes}>
      {leftContent}
      {props.itemsCountPerPage !== undefined && props.totalItemsCount > props.itemsCountPerPage && (
        <ReactJsPagination {...rest} />
      )}
    </div>
  );
}

export default Pagination;