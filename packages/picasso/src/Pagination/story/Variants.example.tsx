import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        Default
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        Compact
      </Typography>
    </Container>
    <Container>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        totalPages={5}
        variant='compact'
      />
    </Container>
  </Container>
)

const handlePageChange = (page: number) => {
  window.alert('Page changed to ' + page)
}

export default Example
