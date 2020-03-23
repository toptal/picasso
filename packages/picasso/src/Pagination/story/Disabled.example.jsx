import React from 'react'
import { Pagination } from '@toptal/picasso'

const Example = () => (
  <div>
    <Pagination
      activePage={4}
      disabled
      onPageChange={handlePageChange}
      totalPages={10}
    />
  </div>
)

const handlePageChange = () => {}

export default Example
