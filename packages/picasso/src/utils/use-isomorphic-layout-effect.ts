import { useEffect, useLayoutEffect } from 'react'

import { isSSR } from './is-ssr'

const useIsomorphicLayoutEffect = isSSR() ? useEffect : useLayoutEffect

export { useIsomorphicLayoutEffect }
