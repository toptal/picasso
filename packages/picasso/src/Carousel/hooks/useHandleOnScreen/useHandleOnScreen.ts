import { useEffect } from 'react'

type Props = {
  autoplay: boolean
  isOnScreen: boolean
  startAutoplay: () => void
  stopAutoplay: () => void
  onInView?: (isVisibleOnScreen: boolean) => void
}

const useHandleOnScreen = ({
  autoplay,
  isOnScreen,
  startAutoplay,
  stopAutoplay,
  onInView,
}: Props) => {
  useEffect(() => {
    if (typeof onInView === 'function') {
      onInView(isOnScreen)
    }

    if (autoplay) {
      if (isOnScreen) {
        startAutoplay()
      }

      if (!isOnScreen) {
        stopAutoplay()
      }

      return () => {
        stopAutoplay()
      }
    }
  }, [isOnScreen, startAutoplay, stopAutoplay, onInView, autoplay])
}

export default useHandleOnScreen
