import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' }
]

const TagSelectorLoadingExample = () => (
  <div>
    <TagSelector
      inputValue='Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh'
      placeholder='Loading Loading Loading Loading Loading Loading Loadingstate...'
      options={options}
      loading
    />
  </div>
)

export default TagSelectorLoadingExample
