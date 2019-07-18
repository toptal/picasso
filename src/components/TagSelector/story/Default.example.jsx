import React from 'react'
import { TagSelector, Menu } from '@toptal/picasso'

const options = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AI', label: 'Aland Islands' },
  { value: 'ALB', label: 'Albania' },
  { value: 'ALG', label: 'Algeria' }
]
const Action = ({ inputValue, selectedItems }) => (
  <Menu.Item
    onClick={() => {
      console.log('custom action: ', inputValue, selectedItems)
    }}
  >
    Custom Action
  </Menu.Item>
)
const TagSelectorDefaultExample = () => (
  <div>
    <TagSelector
      options={options}
      preselectedItems={['AF']}
      placeholder='Start typing...'
      onAdd={(value, selectedItems) =>
        console.log('onAdd: ', value, selectedItems)
      }
      onRemove={(value, selectedItems) =>
        console.log('onRemove: ', value, selectedItems)
      }
      action={Action}
    />
  </div>
)

export default TagSelectorDefaultExample
