import { Dispatch, useCallback } from 'react'

import { FormatType as EditorFormatType } from '../../../QuillEditor'
import { actions as toolbarActions } from '../../store/toolbar'
import { ActionsType } from '../../store'
import { getToolbarFormatFromEditorFormat } from '../../utils/convertFormat'

type Props = {
  dispatch: Dispatch<ActionsType>
}

const useOnSelectionChange = ({ dispatch }: Props) => {
  const handleSelectionChange = useCallback(
    (editorFormat: EditorFormatType) => {
      const { bold, italic, header, list } =
        getToolbarFormatFromEditorFormat(editorFormat)

      toolbarActions.setBold(dispatch)(bold)
      toolbarActions.setItalic(dispatch)(italic)
      toolbarActions.setHeader(dispatch)(header)
      toolbarActions.setList(dispatch)(list)
    },
    [dispatch]
  )

  return { handleSelectionChange }
}

export default useOnSelectionChange
