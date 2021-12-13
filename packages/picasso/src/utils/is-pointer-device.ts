import isBrowser from './is-browser'

const isPointerDevice = (): boolean | undefined => {
  return isBrowser()
    ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
    : undefined
}

export default isPointerDevice
