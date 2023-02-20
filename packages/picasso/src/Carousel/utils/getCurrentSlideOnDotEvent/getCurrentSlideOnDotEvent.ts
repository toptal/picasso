type Props = {
  slidesToShow: number
  currentDot: number
}

const getCurrentSlideOnDotEvent = ({ slidesToShow, currentDot }: Props) => {
  const slidesToShowRounded = Math.round(slidesToShow)
  const currentSlide =
    (currentDot + 1) * slidesToShowRounded - slidesToShowRounded

  return currentSlide
}

export default getCurrentSlideOnDotEvent
