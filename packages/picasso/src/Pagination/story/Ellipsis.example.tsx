import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        0 or 1 pages
      </Typography>
      <Typography size='xsmall'>~ NULL ~</Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={1}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        No ellipsises
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
        End ellipsis
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        Start ellipsis
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={5}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        Two ellipsises
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={1234}
        onPageChange={handlePageChange}
        totalPages={10000}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        Custom siblings count
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={1234}
        onPageChange={handlePageChange}
        totalPages={10000}
        siblingCount={4}
      />
    </Container>
  </Container>
)

const handlePageChange = (page: number) => {
  window.alert('Page changed to ' + page)
}

export default Example
