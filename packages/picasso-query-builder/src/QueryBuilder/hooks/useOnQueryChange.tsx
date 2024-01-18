import type { RuleGroupTypeAny } from 'react-querybuilder'
import { useNotifications } from '@toptal/picasso-notification'
import { useCallback } from 'react'

import { getQueryDepth } from '../../utils'

type Props = {
  maxGroupDepth: number
  callback: (query: RuleGroupTypeAny) => void
}

export const useOnQueryChange = ({ maxGroupDepth, callback }: Props) => {
  const { showError } = useNotifications()

  const handleQueryChange = useCallback(
    (changedQuery: RuleGroupTypeAny) => {
      // subtract one because we do not count top level query as depth level 1
      // object depth level is not exactly the query depth level
      const level = getQueryDepth(changedQuery) - 1

      if (level > maxGroupDepth) {
        return showError(
          `Can not exceed maximum group depth (${maxGroupDepth})`
        )
      }
      callback(changedQuery)
    },
    [maxGroupDepth, callback, showError]
  )

  return { handleQueryChange }
}
