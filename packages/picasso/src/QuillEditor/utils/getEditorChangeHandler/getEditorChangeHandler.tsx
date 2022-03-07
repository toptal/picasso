import Quill, { RangeStatic, Sources } from 'quill'
import Delta from 'quill-delta'

import { FormatType } from '../../types'

type SelectionChangeArgs = [RangeStatic, RangeStatic, Sources]
type TextChangeArgs = [Delta, Delta, Sources]

// When we write heading and enter new line, we have normal text format.
// We need to send this information to the state
const handleNewLineAfterHeader = ({
  quill,
  onSelectionChange,
  latestDelta
}: {
  quill: Quill
  onSelectionChange: (format: FormatType) => void
  latestDelta: Delta
}) => {
  const isHeaderFormatRemoved =
    latestDelta.ops[latestDelta.ops.length - 1]?.attributes?.header === null

  if (isHeaderFormatRemoved) {
    const format = quill.getFormat() as FormatType

    onSelectionChange({ ...format, header: undefined })
  }
}

const getEditorChangeHandler = (
  quill: Quill,
  onSelectionChange: (format: FormatType) => void
) => {
  const handler = (
    name: 'text-change' | 'selection-change',
    ...args: SelectionChangeArgs | TextChangeArgs
  ) => {
    if (name === 'text-change') {
      const [latestDelta, , source] = args as TextChangeArgs

      const isFromApi = source === 'api'
      const isFromUser = source === 'user'

      if (isFromApi) {
        // this event is triggered when format of block element is changed
        // for example from p > h3 | h3 > ol
        onSelectionChange(quill.getFormat() as FormatType)
      } else if (isFromUser) {
        handleNewLineAfterHeader({ latestDelta, quill, onSelectionChange })
      }
    }
  }

  return handler
}

export default getEditorChangeHandler
