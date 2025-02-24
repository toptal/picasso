import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Disabled
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={4}
        disabled
        onPageChange={handlePageChange}
        totalPages={10}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Next disabled
      </Typography>
    </Container>
    <Container>
      <Pagination
        activePage={4}
        nextDisabled
        onPageChange={handlePageChange}
        totalPages={10}
      />
    </Container>
  </Container>
)

const handlePageChange = () => {}

export default Example
