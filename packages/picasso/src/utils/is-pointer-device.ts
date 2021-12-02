import isBrowser from './is-browser'

const isPointerDevice = () => {
  return isBrowser()
    ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
    : undefined
}

export default isPointerDevice
