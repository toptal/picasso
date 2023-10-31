import React from 'react'
import { Button, Container, Loader } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'
import type { TestId } from '../types/query-builder'

type Props = {
  loading?: boolean
  onClick?: () => void
  totalCount?: number
  totalCountLoading?: boolean
  runQueryTestId: TestId['runQueryButton']
}

const useStyles = makeStyles(styles)

export const RunQueryButton = ({
  loading,
  onClick,
  totalCount,
  totalCountLoading,
  runQueryTestId,
}: Props) => {
  const classes = useStyles()

  const renderTotalCount = () => {
    if (totalCountLoading) {
      return (
        <Container left='small'>
          <Loader size='small' variant='inherit' />
        </Container>
      )
    }

    return totalCount !== undefined && `(${totalCount})`
  }

  return (
    <Button
      className={classes.root}
      variant='positive'
      loading={loading}
      onClick={onClick}
      data-testid={runQueryTestId}
    >
      Run Query {renderTotalCount()}
    </Button>
  )
}
