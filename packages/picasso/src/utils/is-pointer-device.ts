const isPointerDevice = () => {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export default isPointerDevice
