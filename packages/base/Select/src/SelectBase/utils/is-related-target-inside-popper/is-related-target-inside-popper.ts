import type { PopperHandle } from '@toptal/picasso-popper'

const isRelatedTargetInsidePopper = (
  event: React.FocusEvent,
  popperRef: React.Ref<PopperHandle> | undefined
) =>
  typeof popperRef === 'object' &&
  popperRef?.current &&
  popperRef.current.popper.contains(event.relatedTarget as Node)

export default isRelatedTargetInsidePopper
