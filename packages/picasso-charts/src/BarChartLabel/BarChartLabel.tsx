import { palette } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { LabelProps, ViewBox } from 'recharts'

export type Props = {
  value?: LabelProps['value']
  viewBox?: ViewBox
  color?: 'dark-grey' | 'red'
}

const BarChartLabel = ({ value, viewBox, color }: Props) => {
  const width = viewBox?.width ?? 0
  const xPosition = viewBox?.x ?? 0
  const yPosition = viewBox?.y ?? 0

  const fill = useMemo(() => {
    if (color === 'red') {
      return palette.red.main
    }

    return palette.grey.dark
  }, [color])

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={fill}
      style={{ fontSize: 11 }}
      textAnchor='middle'
      dy={-6}
    >
      {value}
    </text>
  )
}

BarChartLabel.defaultProps = {
  color: 'dark-grey'
}

export default BarChartLabel
