import { useEffect } from 'react'

type Props = {
  pauseAutoplayOnHover: boolean
  startAutoplay: () => void
  stopAutoplay: () => void
  wrapperRef: React.RefObject<HTMLDivElement>
}

const usePauseAutoplayOnHover = ({
  pauseAutoplayOnHover,
  startAutoplay,
  stopAutoplay,
  wrapperRef,
}: Props) => {
  useEffect(() => {
    if (pauseAutoplayOnHover && wrapperRef.current) {
      let pause = true
      const wrapper = wrapperRef.current

      const handleMouseover = () => {
        if (pause) {
          stopAutoplay()
          pause = false
        }
      }

      const handleMouseout = () => {
        if (!pause) {
          startAutoplay()
          pause = true
        }
      }

      wrapper.addEventListener('mouseenter', handleMouseover)
      wrapper.addEventListener('mouseleave', handleMouseout)

      return () => {
        wrapper.removeEventListener('mouseenter', handleMouseover)
        wrapper.removeEventListener('mouseleave', handleMouseout)
      }
    }
  }, [pauseAutoplayOnHover, stopAutoplay, startAutoplay, wrapperRef])
}

export default usePauseAutoplayOnHover
