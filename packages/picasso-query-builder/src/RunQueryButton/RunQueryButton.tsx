import type { ReactNode } from 'react'
import React from 'react'
import { Button } from '@toptal/picasso-button'

import type { TestId } from '../types/query-builder'
import { rootClassName } from './styles'

type Props = {
  loading?: boolean
  onClick?: () => void
  children?: ReactNode
  runQueryTestId: TestId['runQueryButton']
}

export const RunQueryButton = ({
  loading,
  onClick,
  children = 'Run Query',
  runQueryTestId,
}: Props) => {
  return (
    <Button
      className={rootClassName}
      variant='positive'
      loading={loading}
      onClick={onClick}
      data-testid={runQueryTestId}
    >
      {children}
    </Button>
  )
}
