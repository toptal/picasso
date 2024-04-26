import type { ReactNode } from 'react'
import React from 'react'
import { Button } from '@toptal/picasso-button'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'
import type { TestId } from '../types/query-builder'

type Props = {
  loading?: boolean
  onClick?: () => void
  children?: ReactNode
  runQueryTestId: TestId['runQueryButton']
}

const useStyles = makeStyles(styles)

export const RunQueryButton = ({
  loading,
  onClick,
  children = 'Run Query',
  runQueryTestId,
}: Props) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.root}
      variant='positive'
      loading={loading}
      onClick={onClick}
      data-testid={runQueryTestId}
    >
      {children}
    </Button>
  )
}
