import React from 'react'
import { Pagination } from '@toptal/picasso'

const Example = () => (
  <div>
    <Pagination
      activePage={4}
      onPageChange={handlePageChange}
      totalPages={10}
    />
  </div>
)

const handlePageChange = (page: number) => {
  window.alert('Page changed to ' + page)
}

export default Example
