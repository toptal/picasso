import { useInterval, useOnScreen, useMouseEnter } from '@toptal/picasso-utils'

type Props = {
  wrapperRef: React.RefObject<HTMLDivElement>
  slideNext: () => void
  autoplay: boolean
  autoplayDelay: number
  rewind: boolean
  isLastPage: boolean
}

const useAutoplay = ({
  wrapperRef,
  slideNext,
  autoplay,
  autoplayDelay,
  rewind,
  isLastPage,
}: Props) => {
  const isOnScreen = useOnScreen({ ref: wrapperRef })
  const isMouseOver = useMouseEnter(wrapperRef)

  useInterval({
    callback: slideNext,
    delay: autoplayDelay,
    isPaused:
      !autoplay || (!rewind && isLastPage) || !isOnScreen || isMouseOver,
  })
}

export default useAutoplay
