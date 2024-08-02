import React, { useMemo } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import gradientWidth from './utils/gradient-width'

type Props = {
  slidesToShow: number
  isLastPage: boolean
}

const CarouselGradient = ({ isLastPage, slidesToShow }: Props) => {
  const showNextGradient = !isLastPage
  const showPrevGradient = isLastPage

  const gradientStyle = useMemo(() => {
    return {
      width: gradientWidth(slidesToShow),
    }
  }, [slidesToShow])

  return (
    <div
      style={gradientStyle}
      className={twMerge(
        (showNextGradient || showPrevGradient) && 'absolute h-full top-0',
        showNextGradient &&
          'right-0 bg-gradient-to-r from-white/20 to-white to-95%',
        showPrevGradient &&
          'left-0 bg-gradient-to-r from-white from-5% to-white/20'
      )}
    />
  )
}

export default React.memo(CarouselGradient)
