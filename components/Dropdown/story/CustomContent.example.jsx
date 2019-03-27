import React from 'react'
import { Dropdown, Logo } from '@toptal/picasso'

const CustomContent = () => (
  <Logo variant='black' style={{ fontSize: '3em', padding: '20px' }} />
)

const DropdownCustomContentExample = () => (
  <div>
    <Dropdown content={<CustomContent />}>
      <span>Open black Toptal logo</span>
    </Dropdown>
  </div>
)

export default DropdownCustomContentExample
