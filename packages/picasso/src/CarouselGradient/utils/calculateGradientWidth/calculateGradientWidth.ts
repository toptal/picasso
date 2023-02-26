const calculateGradientWidth = (slidesToShow: number) => {
  if (Number.isInteger(slidesToShow)) {
    return 0
  }

  const slideWidth = 100 / slidesToShow
  const gradientWidth = slideWidth * (slidesToShow % 1)

  return gradientWidth
}

export default calculateGradientWidth
