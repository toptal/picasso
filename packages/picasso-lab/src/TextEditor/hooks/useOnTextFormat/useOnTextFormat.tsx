import { Dispatch, useCallback } from 'react'

import { ActionsType } from '../../store'
import { actions as toolbarActions } from '../../store/toolbar'
import { TextFormatHandler } from '../../../QuillEditor'

type Props = {
  dispatch: Dispatch<ActionsType>
}

const useOnTextFormat = ({ dispatch }: Props) => {
  const handleTextFormat: TextFormatHandler = useCallback(
    (formatType, value) => {
      const actionMap = {
        bold: toolbarActions.setBold,
        italic: toolbarActions.setItalic,
        list: toolbarActions.setList,
        header: toolbarActions.setHeader
      }
      const action = actionMap[formatType]

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action(dispatch)(value)
    },
    [dispatch]
  )

  return { handleTextFormat }
}

export default useOnTextFormat
