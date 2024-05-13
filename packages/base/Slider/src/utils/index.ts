export type GetBgColorType = {
  markActive?: boolean
  hideTrack?: boolean
  value?: number | readonly number[]
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
