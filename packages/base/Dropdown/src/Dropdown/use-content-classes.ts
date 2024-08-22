import { twJoin } from '@toptal/picasso-tailwind-merge'
import React from 'react'

const useContentClasses = (contentType: 'scroll' | 'visible') => {
  const [maxHeightClass, setMaxHeightClass] = React.useState('')

  const updateMaxHeight = React.useCallback(() => {
    const viewportHeight = window.innerHeight
    let newMaxHeightClass = ''

    if (viewportHeight <= 585) {
      if (contentType === 'visible') {
        newMaxHeightClass = 'max-h-screen overflow-y-scroll'
      } else {
        newMaxHeightClass =
          'max-h-[calc(50vh-3rem)] md:max-h-[calc(50vh-3.5rem)] lg:max-h-[calc(50vh-3.5rem)] xl:max-h-[calc(50vh-3.5rem)]'
      }
    } else {
      newMaxHeightClass = 'max-h-[14.75rem]'
    }

    setMaxHeightClass(newMaxHeightClass)
  }, [contentType])

  React.useEffect(() => {
    window.addEventListener('resize', updateMaxHeight)

    updateMaxHeight()

    return () => {
      window.removeEventListener('resize', updateMaxHeight)
    }
  }, [updateMaxHeight])

  const baseContentClasses = 'text-[length:inherit] bg-white overflow-y-auto'
  const baseContentVisibleClasses =
    'max-h-none xs:max-h-screen xs:overflow-y-scroll sm:max-h-screen sm:xs:overflow-y-scroll'

  return `${twJoin(
    baseContentClasses,
    contentType === 'visible' ? baseContentVisibleClasses : '',
    maxHeightClass
  )}`
}

export default useContentClasses
