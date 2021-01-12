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
     * but it allows as to be much closer to actual overflow detection while calculating.
     * Tolerance of the render could be 0-2px depending on the font that is used,
     * and also affected by the right-padding added at Ellipsis component.
     */
    const fontRenderSpace = 0.475

    setIsEllipsis(
      ref.current.scrollWidth > rect.width + fontRenderSpace ||
        ref.current.scrollHeight > rect.height + fontRenderSpace
    )
  }

  // @ts-ignore
  const ro = new window.ResizeObserver(measure)

  React.useLayoutEffect(measure)

  React.useEffect(() => {
    window.addEventListener('resize', measure)

    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [])

  React.useEffect(() => {
    const container = ref.current?.parentNode

    ro.observe(container)

    return () => {
      if (ro) {
        ro.unobserve(container)
      }
    }
  }, [ref.current])

  return { ref, isEllipsis }
}

export default useEllipsis
