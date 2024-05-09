export type GetBgColorType = {
  markActive?: boolean
  hideTrack?: boolean
  value?: number | readonly number[]
}

export type GetTooltipHorizontalPosition = {
  placement: 'left' | 'right'
}

export const getBgColor = ({
  markActive,
  hideTrack,
  value,
}: GetBgColorType) => {
  const isMarkActiveAndTrackVisible = markActive && !hideTrack
  const isOwnerValueUndefined = value === undefined

  if (isMarkActiveAndTrackVisible) {
    // This is needed only for the example 'Hide thumb when value is null or undefined'
    // because the thumb is not shown so the mark needs to be gray even if is active (blue color)
    return isOwnerValueUndefined ? 'bg-gray-500' : 'bg-blue-500'
  }

  return 'bg-gray-500'
}

export const getTooltipHorizontalPosition = ({
  placement,
}: GetTooltipHorizontalPosition) => {
  return placement === 'left'
    ? 'right-[calc(100%-13px)]'
    : 'left-[calc(100%-13px)]'
}
