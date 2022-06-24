import { useCallback } from 'react'

import {
  TextFormatHandler,
  CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
  FormatType as EditorFormatType,
} from '../../../QuillEditor'
import { INSERT_DEFAULT_LINK_TEXT } from '../../../QuillEditor/constants'
import {
  SelectOnChangeHandler,
  ButtonHandlerType,
} from '../../../RichTextEditorToolbar'
import { FormatType } from '../../store/toolbar'
import { convertHeaderToEditorValue } from '../../utils/convertFormat'

type Props = {
  editorRef: React.RefObject<HTMLDivElement | null>
  handleTextFormat: TextFormatHandler
  format: FormatType
}

const useToolbarHandlers = ({ editorRef, handleTextFormat, format }: Props) => {
  const sendFormatEvent = useCallback(
    (detail: Partial<EditorFormatType>) => {
      const formatEvent = new CustomEvent(CUSTOM_QUILL_EDITOR_FORMAT_EVENT, {
        detail,
      })

      editorRef.current?.dispatchEvent(formatEvent)
    },
    [editorRef]
  )

  const sendDefaultLinkTextEvent = useCallback(
    detail => {
      const defaultLinkTextEvent = new CustomEvent(INSERT_DEFAULT_LINK_TEXT, {
        detail,
      })

      editorRef.current?.dispatchEvent(defaultLinkTextEvent)
    },
    [editorRef]
  )

  const handleBold: ButtonHandlerType = () => {
    const bold = !format.bold

    sendFormatEvent({ bold })
    handleTextFormat({
      formatName: 'bold',
      value: bold,
    })
  }

  const handleItalic: ButtonHandlerType = () => {
    const italic = !format.italic

    sendFormatEvent({ italic })
    handleTextFormat({
      formatName: 'italic',
      value: italic,
    })
  }

  const handleOrdered: ButtonHandlerType = () => {
    const list = format.list === 'ordered' ? undefined : 'ordered'

    sendFormatEvent({ list })
    handleTextFormat({
      formatName: 'list',
      value: list,
    })
  }

  const handleUnordered: ButtonHandlerType = () => {
    const list = format.list === 'bullet' ? undefined : 'bullet'

    sendFormatEvent({ list })
    handleTextFormat({
      formatName: 'list',
      value: list,
    })
  }

  const handleHeader: SelectOnChangeHandler = event => {
    const header = convertHeaderToEditorValue(event.target.value)

    sendFormatEvent(
      header ? { header, bold: false, italic: false } : { header }
    )
    handleTextFormat({
      formatName: 'header',
      value: header,
    })
  }

  const handleLink: ButtonHandlerType = () => {
    const link = window.prompt('URL')

    const URLRegexp = new RegExp(
      /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi
    )

    if (!link || !URLRegexp.test(link)) {
      window.alert('Not valid URL')

      return
    }

    sendDefaultLinkTextEvent({ link })

    sendFormatEvent({ link })
    handleTextFormat({
      formatName: 'link',
      value: link,
    })
  }

  return {
    handleBold,
    handleItalic,
    handleOrdered,
    handleUnordered,
    handleHeader,
    handleLink,
  }
}

export default useToolbarHandlers
