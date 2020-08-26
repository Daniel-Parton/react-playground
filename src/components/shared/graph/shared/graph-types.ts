export type GraphTooltipType = 'single' | 'multi'
export interface LineBaseProps {
  series: LineSeriesData[]
  className?: string
  showLegend?: boolean
  tooltipType?: 'single' | 'multi'
}

export interface LineSeriesData {
  id: string
  data: LineSeriesXYData[]
}

export interface LineSeriesXYData {
  x: any
  y: any
}