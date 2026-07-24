import type { CSSProperties } from 'react'

// The track (rail and indicator) stops at the thumb's outer edge — half of
// the 19px thumb box, which includes its 2px transparent border — so the
// background shows through between the thumb and the track on any surface.
const THUMB_EDGE_OFFSET = 9.5

export type GetTrackStylesProps = {
  values: readonly number[]
  min: number
  max: number
  hasThumbGap: boolean
}

export type TrackStyles = {
  railStart: CSSProperties
  railEnd: CSSProperties
  indicator: CSSProperties
}

export const getTrackStyles = ({
  values,
  min,
  max,
  hasThumbGap,
}: GetTrackStylesProps): TrackStyles => {
  const percents = values.map(value => ((value - min) / (max - min)) * 100)
  const start = Math.min(...percents)
  const end = Math.max(...percents)
  const edge = hasThumbGap ? THUMB_EDGE_OFFSET : 0
  const isRange = values.length > 1

  return {
    railStart: {
      insetInlineStart: 0,
      width: `calc(${start}% - ${edge}px)`,
    },
    railEnd: {
      insetInlineStart: `calc(${end}% + ${edge}px)`,
      insetInlineEnd: 0,
    },
    indicator: isRange
      ? {
          insetInlineStart: `calc(${start}% + ${edge}px)`,
          width: `calc(${end - start}% - ${edge * 2}px)`,
        }
      : { width: `calc(${end}% - ${edge}px)` },
  }
}
