import React from "react";
import { ResponsiveLine } from '@nivo/line'
import classNames from "classnames";

import { LineBaseProps } from "./shared/graph-types";
import * as Helper from "./shared/graph-helper";

interface LineTimeGraphProps extends LineBaseProps {
  className?: string
  ymin?: number
  ymax?: number
  height?: number
}

const LineGraph: React.FC<LineTimeGraphProps> = (props) => {

  const { className, height } = props;
  const classes = classNames({
    'line-graph': true,
    [className!]: className !== undefined
  });

  return (
    <div className={classes} style={{ height: height ?? 400 }}>
      <ResponsiveLine
        {...Helper.resolveLineProps(props) as any}
      />
    </div>
  )
}

export default LineGraph;