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
      selectedTags={['AF']}
      placeholder='Start typing...'
      onAdd={(value, selectedTags) =>
        console.log('onAdd: ', value, selectedTags)
      }
      onRemove={(value, selectedTags) =>
        console.log('onRemove: ', value, selectedTags)
      }
      action={Action}
    />
  </div>
)

export default TagSelectorDefaultExample
