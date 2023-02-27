import useInterval from '../../../utils/useInterval'
import useOnScreen from '../../../utils/useOnScreen'
import useMouseEnter from '../../../utils/useMouseEnter'

type Props = {
  elementRef: React.RefObject<HTMLDivElement>
  slideNext: () => void
  autoplay: boolean
  autoplayDelay: number
  rewind: boolean
  isLastPage: boolean
}

const useAutoplay = ({
  elementRef,
  slideNext,
  autoplay,
  autoplayDelay,
  rewind,
  isLastPage,
}: Props) => {
  const isOnScreen = useOnScreen({ ref: elementRef })
  const isMouseOver = useMouseEnter(elementRef)

  useInterval({
    callback: slideNext,
    delay: autoplayDelay,
    isPaused:
      !autoplay || (!rewind && isLastPage) || !isOnScreen || isMouseOver,
  })
}

export default useAutoplay
