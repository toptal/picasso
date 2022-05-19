import PopperJs from 'popper.js'

const isRelatedTargetInsidePopper = (
  event: React.FocusEvent,
  popperRef: React.Ref<PopperJs> | undefined
) =>
  typeof popperRef === 'object' &&
  popperRef?.current &&
  popperRef.current.popper.contains(event.relatedTarget as Node)

export default isRelatedTargetInsidePopper
