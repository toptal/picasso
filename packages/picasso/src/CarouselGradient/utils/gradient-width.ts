/**
 * Calculates the width of the gradient that fades out the edges of the slider.
 * @param slidesToShow The number of slides to show in the slider.
 * @returns The width of the gradient in %
 */
const gradientWidth = (slidesToShow: number) => {
  const slideWidth = 100 / slidesToShow
  const partialSlideWidth = slideWidth * (slidesToShow % 1)

  return `${Math.round(partialSlideWidth)}%`
}

export default gradientWidth
