import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AI', label: 'Aland Islands' },
  { value: 'ALB', label: 'Albania' },
  { value: 'ALG', label: 'Algeria' }
]
// const Action = (inputValue) => (
//   <Menu.Item
//     onClick={() => {
//       console.log('custom action: ', inputValue)
//     }}
//   >
//     Custom Action
//   </Menu.Item>
// )

const TagSelectorDefaultExample = () => (
  <div>
    <TagSelector
      options={options}
      preselectedItems={['AF']}
      placeholder='Start typing...'
      onChange={(value, selectedItems) =>
        console.log('onChange: ', value, selectedItems)
      }
    />
  </div>
)

export default TagSelectorDefaultExample
