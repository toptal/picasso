import { twJoin } from '@toptal/picasso-tailwind-merge'
import React from 'react'

const useContentClasses = (contentOverflow: 'scroll' | 'visible') => {
  const [maxHeightClass, setMaxHeightClass] = React.useState('')

  const updateMaxHeight = React.useCallback(() => {
    const viewportHeight = window.innerHeight
    let newMaxHeightClass = ''

    if (viewportHeight <= 585) {
      if (contentOverflow === 'visible') {
        newMaxHeightClass = 'max-h-screen overflow-y-scroll'
      } else {
        newMaxHeightClass =
          'max-h-[calc(50vh-3rem)] md:max-h-[calc(50vh-3.5rem)] lg:max-h-[calc(50vh-3.5rem)] xl:max-h-[calc(50vh-3.5rem)]'
      }
    } else {
      newMaxHeightClass = 'max-h-[14.75rem]'
    }

    setMaxHeightClass(newMaxHeightClass)
  }, [contentOverflow])

  React.useEffect(() => {
    window.addEventListener('resize', updateMaxHeight)

    updateMaxHeight()

    return () => {
      window.removeEventListener('resize', updateMaxHeight)
    }
  }, [updateMaxHeight])

  const baseContentClasses = 'text-[length:inherit] bg-white overflow-y-auto'
  const baseContentVisibleClasses =
    'max-h-screen overflow-y-scroll md:max-h-none md:overflow-y-hidden'

  return `${twJoin(
    baseContentClasses,
    contentOverflow === 'visible' ? baseContentVisibleClasses : '',
    maxHeightClass
  )}`
}

export default useContentClasses

export const contentClass = {
  content: `overflow-y-auto max-h-[26.875rem] 
  [@media(max-height:585px)]:max-h-[calc(50vh-4.3125rem)]
  [@media(max-height:585px)]:md:max-h-[calc(50vh-4.8125rem)]`,
  contentVisible: `max-h-screen overflow-y-scroll md:max-h-none md:overflow-y-hidden
    [@media(max-height:585px)]:max-h-screen overflow-y-scroll`,
}
