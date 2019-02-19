import React from 'react'

import Pagination from '../Pagination'

const PaginationDisabledExample = () => (
  <div>
    <Pagination activePage={4} disabled totalPages={10} />
  </div>
)

export default PaginationDisabledExample
