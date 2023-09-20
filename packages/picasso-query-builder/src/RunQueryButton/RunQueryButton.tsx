import React from 'react'
import { Button, Container, Loader } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

type Props = {
  loading?: boolean
  onClick?: () => void
  totalCount?: number
  totalCountLoading?: boolean
}

const useStyles = makeStyles(styles)

const RunQueryButton = ({
  loading,
  onClick,
  totalCount,
  totalCountLoading,
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
    >
      Run Query {renderTotalCount()}
    </Button>
  )
}

export default RunQueryButton
