import { TextFormatHandler, FormatType } from '../../../QuillEditor'
import {
  SelectOnChangeHandler,
  ButtonHandlerType
} from '../../../TextEditorToolbar'

type Props = {
  handleTextFormat: TextFormatHandler
  format: FormatType
}

const useToolbarHandlers = ({ handleTextFormat, format }: Props) => {
  const handleBold: ButtonHandlerType = () =>
    handleTextFormat('bold', !format.bold)

  const handleItalic: ButtonHandlerType = () =>
    handleTextFormat('italic', !format.italic)

  const handleOrdered: ButtonHandlerType = () =>
    handleTextFormat('list', format.list === 'ordered' ? false : 'ordered')

  const handleUnordered: ButtonHandlerType = () =>
    handleTextFormat('list', format.list === 'bullet' ? false : 'bullet')

  const handleHeader: SelectOnChangeHandler = event =>
    handleTextFormat('header', event.target.value)

  return {
    handleBold,
    handleItalic,
    handleOrdered,
    handleUnordered,
    handleHeader
  }
}

export default useToolbarHandlers
