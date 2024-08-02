import React, { memo } from 'react'
import { ButtonCircular } from '@toptal/picasso-button'
import { Container } from '@toptal/picasso-container'
import { ChevronRight24 } from '@toptal/picasso-icons'

const getJustifyContent = (hasArrows: boolean, hasDots: boolean) => {
  if (hasArrows && hasDots) {
    return 'space-between'
  }

  if (hasArrows) {
    return 'flex-end'
  }

  if (hasDots) {
    return 'center'
  }
}

type Props = {
  hasArrows: boolean
  hasDots: boolean
  getDotsProps: () => {}
  getNextProps: () => {}
  getPrevProps: () => {}
  testIds: {
    navigation?: string
    arrows?: string
    prev?: string
    next?: string
    dots?: string
  }
}

const CarouselNavigation = ({
  getDotsProps,
  getNextProps,
  getPrevProps,
  hasArrows,
  hasDots,
  testIds,
}: Props) => {
  return (
    <Container
      className='pt-[14px] px-6 pb-0'
      flex
      justifyContent={getJustifyContent(hasArrows, hasDots)}
      data-testid={testIds.navigation}
    >
      {hasDots && (
        /*
         default slider css ads margin: 0 auto; to the dots container
         so we need to wrap it in a div to avoid the margin.
         Could be removed when we migrate all styles to TailwindCSS
        */
        <div>
          <div
            {...getDotsProps()}
            data-testid={testIds.dots}
            className={`
              [&_.glider-dot]:w-[10px]
              [&_.glider-dot]:h-[10px]
              [&_.glider-dot]:bg-blue-500
              [&_.glider-dot]:opacity-20

              [&_.glider-dot.active]:bg-blue-500 [&_.glider-dot.active]:opacity-100

              [&_.glider-dot:not(.active):hover]:opacity-100
              [&_.glider-dot:not(.active):hover]:shadow-[0_0_0_2px_rgba(32,78,207,0.2)]
              [&_.glider-dot:not(.active):hover]:transition-[box-shadow,opacity]
              [&_.glider-dot:not(.active):hover]:duration-300
              [&_.glider-dot:not(.active):hover]:ease-out
            `}
          />
        </div>
      )}
      {hasArrows && (
        <Container data-testid={testIds.arrows}>
          <ButtonCircular
            className='rotate-180'
            data-testid={testIds.prev}
            icon={<ChevronRight24 />}
            variant='flat'
            {...getPrevProps()}
          />
          <ButtonCircular
            data-testid={testIds.next}
            icon={<ChevronRight24 />}
            variant='flat'
            {...getNextProps()}
          />
        </Container>
      )}
    </Container>
  )
}

export default memo(CarouselNavigation)
