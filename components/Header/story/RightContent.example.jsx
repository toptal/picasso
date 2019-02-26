import React from 'react'

import Header from '../Header'
import Select from '../../Select'

const HeaderRightContentExample = () => (
  <div>
    <Header rightContent={<RightContent />} title='Onboarding' />
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
  />
)

const OPTIONS = [
  { value: '1', text: 'My Account' },
  { value: '2', text: 'Log Out' }
]

export default HeaderRightContentExample
