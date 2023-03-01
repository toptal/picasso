type Props = {
  currentSlide: number
  slidesCount: number
  slidesToShow: number
}

const isOnLastPage = ({ currentSlide, slidesCount, slidesToShow }: Props) => {
  if (Number.isInteger(slidesToShow) || slidesToShow % 1 <= 0.5) {
    return currentSlide >= slidesCount - slidesToShow
  }

  // when slidesToShow is not a whole number and is bigger than x.5
  // glider.js will not show the whole last slide, only partial
  return currentSlide >= slidesCount - slidesToShow - 1
}

export default isOnLastPage
