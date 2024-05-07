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
    // TODO add proper comment
    return isOwnerValueUndefined ? 'bg-gray-500' : 'bg-blue-500'
  }

  return 'bg-gray-500'
}
