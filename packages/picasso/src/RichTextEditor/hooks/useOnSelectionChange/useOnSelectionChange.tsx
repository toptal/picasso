import type { Dispatch } from 'react'
import { useCallback } from 'react'

import type { FormatType as EditorFormatType } from '../../../QuillEditor'
import { actions as toolbarActions } from '../../store/toolbar'
import type { ActionsType } from '../../store'
import { getToolbarFormatFromEditorFormat } from '../../utils/convertFormat'

type Props = {
  dispatch: Dispatch<ActionsType>
}

const useOnSelectionChange = ({ dispatch }: Props) => {
  const handleSelectionChange = useCallback(
    (editorFormat: EditorFormatType) => {
      const { bold, italic, header, list, link } =
        getToolbarFormatFromEditorFormat(editorFormat)

      toolbarActions.setBold(dispatch)(bold)
      toolbarActions.setItalic(dispatch)(italic)
      toolbarActions.setHeader(dispatch)(header)
      toolbarActions.setList(dispatch)(list)
      toolbarActions.setLink(dispatch)(link)
    },
    [dispatch]
  )

  return { handleSelectionChange }
}

export default useOnSelectionChange
