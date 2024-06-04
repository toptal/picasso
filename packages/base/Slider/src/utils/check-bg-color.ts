export type GetBgColorProps = {
  markActive?: boolean
  forceInactive?: boolean
  value?: number | readonly number[]
}

export const getBgColor = ({
  markActive,
  forceInactive,
  value,
}: GetBgColorProps) => {
  const inactive = 'bg-gray-500'
  const active = 'bg-blue-500'

  if (forceInactive) {
    return inactive
  }

  if (markActive) {
    if (value === undefined) {
      return inactive
    }

    return active
  }

  return inactive
}
