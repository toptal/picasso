import { Dispatch, useCallback } from 'react'

import { ActionsType } from '../../store'
import { actions as toolbarActions } from '../../store/toolbar'
import { TextFormatHandlerEvent } from '../../../QuillEditor'
import {
  convertBoldFromEditorValue,
  convertItalicFromEditorValue,
  convertListFromEditorValue,
  convertHeaderFromEditorValue
} from '../../utils/convertFormat'

type Props = {
  dispatch: Dispatch<ActionsType>
}

const useOnTextFormat = ({ dispatch }: Props) => {
  const handleTextFormat = useCallback(
    (e: TextFormatHandlerEvent) => {
      switch (e.formatName) {
        case 'bold': {
          const boldValue = convertBoldFromEditorValue(e.value)

          return toolbarActions.setBold(dispatch)(boldValue)
        }
        case 'italic': {
          const italicValue = convertItalicFromEditorValue(e.value)

          return toolbarActions.setItalic(dispatch)(italicValue)
        }
        case 'list': {
          const listValue = convertListFromEditorValue(e.value)

          return toolbarActions.setList(dispatch)(listValue)
        }
        case 'header': {
          const headerValue = convertHeaderFromEditorValue(e.value)

          return toolbarActions.setHeader(dispatch)(headerValue)
        }
        default:
          throw Error(
            `TextEditor - useOnTextFormat is not implemented for ${e}`
          )
      }
    },
    [dispatch]
  )

  return { handleTextFormat }
}

export default useOnTextFormat
