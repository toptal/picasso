import React from 'react'

interface Props {
  clipPathId: string
  cornerWidth: number
  cornerHeight: number
}

const ClippedCornerMask: React.FunctionComponent<Props> = props => {
  const { clipPathId, cornerWidth, cornerHeight } = props

  return (
    <clipPath id={clipPathId} clipPathUnits='objectBoundingBox'>
      <polygon
        points={`0 0, 1 0, 1 1, ${cornerWidth} 1, 0 ${1 - cornerHeight}`}
      />
    </clipPath>
  )
}

export default ClippedCornerMask
