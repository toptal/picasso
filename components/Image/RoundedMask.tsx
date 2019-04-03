import React from 'react'

interface Props {
  clipPathId: string
  radius: number
}

const RoundedMask: React.FunctionComponent<Props> = props => {
  const { clipPathId, radius } = props

  return (
    <clipPath id={clipPathId} clipPathUnits='userSpaceOnUse'>
      <circle cx={radius} cy={radius} r={radius} />
    </clipPath>
  )
}

export default RoundedMask
