import { Dispatch, useCallback } from 'react'

import { ToolbarStateType } from '../../store/toolbar/types'
import { actions } from '../../store/toolbar'
import { ActionsType } from '../../types'

type Props = {
  dispatch: Dispatch<ActionsType>
}

const useOnSelectionChange = ({ dispatch }: Props) => {
  const handleSelectionChange = useCallback(
    ({ bold, italic, header, list }: ToolbarStateType['format']) => {
      actions.setBold(dispatch)(bold)
      actions.setItalic(dispatch)(italic)
      actions.setHeader(dispatch)(header)
      actions.setList(dispatch)(list)
    },
    [dispatch]
  )

  return { handleSelectionChange }
}

export default useOnSelectionChange
