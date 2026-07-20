import { useCallback } from 'react'

import type { ValueType, UseSelectProps } from '../../../types'
import { EMPTY_INPUT_VALUE } from '../../../utils'

// A click the browser synthesizes from an associated `<label>` activation
// (e.g. picasso-forms wires the field label to the select input via `htmlFor`)
// carries `detail === 0` and the label's coordinates, which lie outside the
// select root. A native `<select>` only receives focus from a label click —
// the options popup must not toggle. Real pointer clicks (`detail >= 1`) and
// assistive-technology clicks (element-centered coordinates) keep toggling.
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
  selectState: { isOpen, canOpen, open, close, setFilterOptionsValue },
}: UseSelectProps<T, M>) =>
  useCallback(
    (event?: React.MouseEvent) => {
      if (isLabelActivationClick(event)) {
        return
      }

      if (canOpen) {
        setFilterOptionsValue(EMPTY_INPUT_VALUE)
        open()
      } else if (isOpen) {
        close()
      }
    },
    [isOpen, canOpen, open, close, setFilterOptionsValue]
  )

export default useClickHandler
