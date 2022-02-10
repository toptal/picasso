import { useCallback } from 'react'

import {
  TextFormatHandler,
  CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
  FormatType as EditorFormatType
} from '../../../QuillEditor'
import {
  SelectOnChangeHandler,
  ButtonHandlerType
} from '../../../RichTextEditorToolbar'
import { FormatType } from '../../store/toolbar'
import { convertHeaderToEditorValue } from '../../utils/convertFormat'

type Props = {
  editorRef: React.RefObject<HTMLDivElement>
  handleTextFormat: TextFormatHandler
  format: FormatType
}

const useToolbarHandlers = ({ editorRef, handleTextFormat, format }: Props) => {
  const sendFormatEvent = useCallback(
    (detail: Partial<EditorFormatType>) => {
      const formatEvent = new CustomEvent(CUSTOM_QUILL_EDITOR_FORMAT_EVENT, {
        detail
      })

      editorRef.current?.dispatchEvent(formatEvent)
    },
    [editorRef]
  )

  const handleBold: ButtonHandlerType = () => {
    const bold = !format.bold

    sendFormatEvent({ bold })
    handleTextFormat({
      formatName: 'bold',
      value: bold
    })
  }

  const handleItalic: ButtonHandlerType = () => {
    const italic = !format.italic

    sendFormatEvent({ italic })
    handleTextFormat({
      formatName: 'italic',
      value: italic
    })
  }

  const handleOrdered: ButtonHandlerType = () => {
    const list = format.list === false ? 'ordered' : undefined

    sendFormatEvent({ list })
    handleTextFormat({
      formatName: 'list',
      value: list
    })
  }

  const handleUnordered: ButtonHandlerType = () => {
    const list = format.list === false ? 'bullet' : undefined

    sendFormatEvent({ list })
    handleTextFormat({
      formatName: 'list',
      value: list
    })
  }

  const handleHeader: SelectOnChangeHandler = event => {
    const header = convertHeaderToEditorValue(event.target.value)

    sendFormatEvent({ header })
    handleTextFormat({
      formatName: 'header',
      value: header
    })
  }

  return {
    handleBold,
    handleItalic,
    handleOrdered,
    handleUnordered,
    handleHeader
  }
}

export default useToolbarHandlers
