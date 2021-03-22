import React from 'react'

const useEllipsis = () => {
  const ref = React.useRef<HTMLDivElement>()
  const [isEllipsis, setIsEllipsis] = React.useState(false)

  const measure = () => {
    if (!ref || !ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    /**
     * Pixel value of font render space correction.
     * It's individual for different fonts, so it won't work for 100% cases,
     * but it allows us to be much closer to actual overflow detection while calculating.
     * Tolerance of the render could be 0-2px depending on the font that is used,
     * and also affected by the right-padding added at Ellipsis component.
     */
    const FONT_RENDER_CORRECTION = 0.475

    setIsEllipsis(
      ref.current.scrollWidth > rect.width + FONT_RENDER_CORRECTION ||
        ref.current.scrollHeight > rect.height + FONT_RENDER_CORRECTION
    )
  }

  React.useLayoutEffect(measure)

  React.useEffect(() => {
    const ResizeObserver = window.ResizeObserver
    const resizeObserver = ResizeObserver ? new ResizeObserver(measure) : null
    const container = ref.current?.parentNode

    resizeObserver?.observe(container as Element)

    window.addEventListener('resize', measure)

    return () => {
      resizeObserver?.unobserve(container as Element)

      window.removeEventListener('resize', measure)
    }
  }, [])

  return { ref, isEllipsis }
}

export default useEllipsis
