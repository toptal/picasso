import { Instance as PopperJs } from '@popperjs/core'

const isRelatedTargetInsidePopper = (
  event: React.FocusEvent,
  popperRef: React.Ref<PopperJs> | undefined
) =>
  typeof popperRef === 'object' &&
  popperRef?.current &&
  popperRef.current.state.elements.popper.contains(event.relatedTarget as Node)

export default isRelatedTargetInsidePopper
