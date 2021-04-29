/**
 * Pixel value of font render space correction.
 * It's individual for different fonts, so it won't work for 100% cases,
 * but it allows us to be much closer to actual overflow detection while calculating.
 * Tolerance of the render could be 0-2px depending on the font that is used,
 * and also affected by the right-padding added at Ellipsis component.
 */
const FONT_RENDER_CORRECTION = 0.475

const isOverflown = (element: HTMLElement) => {
  const { scrollWidth, scrollHeight } = element
  const { width, height } = element.getBoundingClientRect()

  return (
    scrollWidth > width + FONT_RENDER_CORRECTION ||
    scrollHeight > height + FONT_RENDER_CORRECTION
  )
}

export { isOverflown }
