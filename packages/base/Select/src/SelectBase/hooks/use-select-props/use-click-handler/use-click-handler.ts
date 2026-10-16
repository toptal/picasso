import { useCallback } from 'react'

import type { ValueType, UseSelectProps } from '../../../types'
import { EMPTY_INPUT_VALUE } from '../../../utils'

// A label-forwarded click (e.g. picasso-forms links the field label to the
// select via `htmlFor`) carries `detail === 0` and coordinates outside the
// select root; like a native `<select>`, it must only focus — not toggle the
// options popup. Real pointer clicks (`detail >= 1`) and assistive-tech clicks
// (element-centered coordinates) keep toggling.
const isLabelActivationClick = (event?: React.MouseEvent) => {
  if (!event || event.detail !== 0) {
    return false
  }

  const rect = event.currentTarget.getBoundingClientRect()

  const isInsideRoot =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom

  return !isInsideRoot
}

const useClickHandler = <T extends ValueType, M extends boolean = false>({
  selectProps: { disabled },
  selectState: { getIsOpen, open, close, setFilterOptionsValue },
}: UseSelectProps<T, M>) =>
  useCallback(
    (event?: React.MouseEvent) => {
      if (isLabelActivationClick(event)) {
        return
      }

      // Read now rather than from the last render: the search input's blur
      // runs in the same task as the click and may have closed the popup
      if (getIsOpen()) {
        close()
      } else if (!disabled) {
        setFilterOptionsValue(EMPTY_INPUT_VALUE)
        open()
      }
    },
    [getIsOpen, disabled, open, close, setFilterOptionsValue]
  )

export default useClickHandler
