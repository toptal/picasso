type Props = {
  event: Glider.GliderEvent<{
    value: string | number
    type: 'arrow' | 'dot' | 'slide'
  }>
  slidesCount: number
  prevSlide: number
  slidesToShow: number
  isLastPage: boolean
}

const getCurrentSlide = ({
  event,
  slidesCount,
  prevSlide,
  slidesToShow,
  isLastPage,
}: Props): number => {
  const {
    detail: { type, value },
  } = event

  if (type === 'arrow') {
    if (value === 'next') {
      if (isLastPage) {
        return 0
      }

      return prevSlide + 1
    }

    if (value === 'prev') {
      if (prevSlide === 0) {
        return slidesCount - Math.floor(slidesToShow)
      }

      return prevSlide - 1
    }
  }

  if (type === 'dot') {
    const slidesToShowRounded = Math.round(slidesToShow)
    const currentSlide =
      ((value as number) + 1) * slidesToShowRounded - slidesToShowRounded

    return currentSlide
  }

  return value as number
}

export default getCurrentSlide
