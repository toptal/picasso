import React from 'react'
import { UserBadge, Support16, Avatar } from '@toptal/picasso'

const Example = () => (
  <div>
    <UserBadge
      name='Jacqueline Roque'
      title='UI specialist'
      avatar={
        <Avatar.Wrapper className='grid' size='xsmall'>
          <Support16 className='place-self-center' color='white' />
        </Avatar.Wrapper>
      }
    />
  </div>
)

export default Example
