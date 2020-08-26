import React from "react";
import { LineSvgProps } from "@nivo/line";
import { LegendProps } from "@nivo/legends";

import { LineBaseProps, GraphTooltipType } from "./graph-types";
import GraphTooltip from "./graph-tooltip";

export const resolveLineProps = (props: LineBaseProps) => {
  const options: Partial<LineSvgProps> = {
    animate: true,
    curve: 'monotoneX',
    yScale: { type: 'linear' },
    margin: { top: 40, right: 20, bottom: 60, left: 80 },
    data: props.series
  };

  if (!props.series.length) {
    options.yScale = { type: 'linear', min: 0, max: 100 };
  }

  if (!props) return options;
  if (props.showLegend) options.legends = buildLegend();
  setTooltipProps(options, props.tooltipType ?? 'multi');

  return options;
}

const setTooltipProps = (props: Partial<LineSvgProps>, type: GraphTooltipType) => {
  if (type === 'single') {
    props.useMesh = true;
    props.crosshairType = "cross"
    props.tooltip = ({ point }) => <GraphTooltip point={point} />
  } else {
    props.enableSlices = 'x';
  }
}

const buildLegend = () => {
  const legend: LegendProps[] =
    [{
      anchor: 'top',
      direction: 'row',
      translateY: -40,
      itemsSpacing: 10,
      itemWidth: 100,
      itemHeight: 20,
      symbolSize: 20,
      itemTextColor: '#555',
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000',
            itemBackground: '#eee',
          },
        },
      ],
    }];
  return legend;
}