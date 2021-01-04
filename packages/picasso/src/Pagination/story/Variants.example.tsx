import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        1 page
      </Typography>
      <Typography size='small'>~ nothing renders ~</Typography>
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
        2 pages
      </Typography>
    </Container>
    <Container bottom='medium'>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={2}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        3 pages
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={3}
      />
    </Container>
    <Container bottom='medium'>
      <Pagination
        activePage={2}
        onPageChange={handlePageChange}
        totalPages={3}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        4 pages
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={4}
      />
    </Container>
    <Container bottom='medium'>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        totalPages={4}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        5 pages
      </Typography>
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>
    <Container bottom='small'>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>
    <Container bottom='medium'>
      <Pagination
        activePage={5}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        6 and more pages
      </Typography>
    </Container>
    <Container bottom='medium'>
      <Pagination
        activePage={5}
        onPageChange={handlePageChange}
        totalPages={10}
      />
    </Container>

    <Container bottom='xsmall'>
      <Typography variant='heading' size='small'>
        Big numbers
      </Typography>
    </Container>
    <Container>
      <Pagination
        activePage={1234}
        onPageChange={handlePageChange}
        totalPages={10000}
      />
    </Container>
  </Container>
)

const handlePageChange = (page: number) => {
  window.alert('Page changed to ' + page)
}

export default Example
