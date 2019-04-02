import React from 'react'
import { Page, Select } from '@toptal/picasso'

const HeaderRightContentExample = () => (
  <div>
    <Page.Header rightContent={<RightContent />} title='Onboarding' />
  </div>
)

const RightContent = () => (
  <Select
    options={OPTIONS}
    placeholder='D. Petrashev'
    style={{
      fontSize: '12px',
      color: 'white'
    }}
    variant='standard'
    width='shrink'
  />
)

const OPTIONS = [
  { value: '1', text: 'My Account' },
  { value: '2', text: 'Log Out' }
]

export default HeaderRightContentExample
