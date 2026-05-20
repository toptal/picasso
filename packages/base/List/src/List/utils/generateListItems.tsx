import React from 'react'

import List from '../List'

/* eslint-disable react/no-array-index-key */
const generateListItems = (total: number, listItemProps?: any) =>
  Array(total)
    .fill(0)
    .map((_, index) => (
      <List.Item key={index} {...listItemProps}>
        {`list item N${index + 1}`}
      </List.Item>
    ))

export default generateListItems
