import { useLayoutEffect, useEffect } from 'react'

import { isBrowser } from '../utils'

export const useIsomorphicLayoutEffect = isBrowser()
  ? useLayoutEffect
  : useEffect
