import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Default
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom={SPACING_2}>
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
