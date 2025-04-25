import { isBrowser } from '@toptal/picasso-shared'
import { useEffect, useMemo } from 'react'

const layers = new Set<number>()
let scrollLock: { prevHtmlOverflow: string } | undefined = undefined

export const usePageScrollLock = (isLocked: boolean) => {
  const layerId = useMemo(generateLayerId, [])

  useEffect(() => {
    if (isLocked) {
      layers.add(layerId)
      syncPageScrollLock()
    }

    return () => {
      layers.delete(layerId)
      syncPageScrollLock()
    }
  }, [layerId, isLocked])
}

const generateLayerId = (() => {
  let count = 0

  return () => {
    count = count + 1

    return count
  }
})()

const syncPageScrollLock = () => {
  if (layers.size > 0) {
    addPageScrollLock()
  } else {
    removePageScrollLock()
  }
}

const addPageScrollLock = () => {
  if (!isBrowser()) {
    return
  }

  if (!scrollLock) {
    scrollLock = {
      prevHtmlOverflow: document.getElementsByTagName('html')[0].style.overflow,
    }
    document.getElementsByTagName('html')[0].style.overflow = 'clip'
  }
}

const removePageScrollLock = () => {
  if (!isBrowser()) {
    return
  }

  if (scrollLock) {
    document.getElementsByTagName('html')[0].style.overflow =
      scrollLock.prevHtmlOverflow
    scrollLock = undefined
  }
}
