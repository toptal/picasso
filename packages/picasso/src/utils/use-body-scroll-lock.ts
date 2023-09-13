import { isBrowser } from '@toptal/picasso-shared'
import { useEffect, useMemo } from 'react'

const layers = new Set<number>()
let scrollLock:
  | { prevBodyOverflow: string; prevHtmlOverflow: string }
  | undefined = undefined

export const useBodyScrollLock = (isLocked: boolean) => {
  const layerId = useMemo(generateLayerId, [])

  useEffect(() => {
    if (isLocked) {
      layers.add(layerId)
      syncBodyScrollLock()
    }

    return () => {
      layers.delete(layerId)
      syncBodyScrollLock()
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

const syncBodyScrollLock = () => {
  if (layers.size > 0) {
    addBodyScrollLock()
  } else {
    removeBodyScrollLock()
  }
}

const addBodyScrollLock = () => {
  if (!isBrowser()) {
    return
  }

  if (!scrollLock) {
    scrollLock = {
      prevBodyOverflow: document.body.style.overflow,
      prevHtmlOverflow: document.getElementsByTagName('html')[0].style.overflow,
    }
    document.body.style.overflow = 'hidden'
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  }
}

const removeBodyScrollLock = () => {
  if (!isBrowser()) {
    return
  }

  if (scrollLock) {
    document.body.style.overflow = scrollLock.prevBodyOverflow
    document.getElementsByTagName('html')[0].style.overflow =
      scrollLock.prevHtmlOverflow
    scrollLock = undefined
  }
}
