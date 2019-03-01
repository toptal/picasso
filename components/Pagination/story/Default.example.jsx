import React from 'react'
import { Pagination } from '@toptal/picasso'

const PaginationDefaultExample = () => (
  <div>
    <Pagination
      activePage={4}
      onPageChange={handlePageChange}
      totalPages={10}
    />
  </div>
)

const handlePageChange = page => {
  window.alert('Page changed to ' + page)
}

export default PaginationDefaultExample
