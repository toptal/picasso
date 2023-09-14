import React from 'react'
import { Button, Container, Loader } from '@toptal/picasso'

type Props = {
  loading?: boolean
  onClick?: () => void
  totalCount?: number
  totalCountLoading?: boolean
}

const RunQueryButton = ({
  loading,
  onClick,
  totalCount,
  totalCountLoading,
}: Props) => {
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
      // css={S.runQuery}
      variant='positive'
      loading={loading}
      onClick={onClick}
    >
      Run Query {renderTotalCount()}
    </Button>
  )
}

export default RunQueryButton
