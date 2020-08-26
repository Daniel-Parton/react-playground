import React from "react";
import { Point } from '@nivo/line'

interface GraphTooltipProps {
  point: Point
  xLabel?: string
  yLabel?: string
}

const GraphTooltip: React.FC<GraphTooltipProps> = ({ xLabel = 'x', yLabel = 'y', point }) => {

  return (
    <div className='graph-tooltip'>
      <div className='graph-tooltip-header'>
        <div className='graph-tooltip-symbol' style={{ backgroundColor: point.color }} />
        {point.serieId}
      </div>
      <div className='graph-tooltip-display'>
        <span><strong>{xLabel}: </strong>{point.data.xFormatted}</span>
      </div>
      <div className='graph-tooltip-y-display'>
        <span><strong>{yLabel}: </strong>{point.data.yFormatted}</span>
      </div>
    </div>
  )
}

export default GraphTooltip;