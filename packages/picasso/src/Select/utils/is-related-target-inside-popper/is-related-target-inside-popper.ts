import { Instance as PopperJsInstance } from '@popperjs/core'

const isRelatedTargetInsidePopper = (
  event: React.FocusEvent,
  popperRef: React.Ref<PopperJsInstance> | undefined
) =>
  typeof popperRef === 'object' &&
  popperRef?.current &&
  popperRef.current.state.elements.popper.contains(event.relatedTarget as Node)

export default isRelatedTargetInsidePopper
