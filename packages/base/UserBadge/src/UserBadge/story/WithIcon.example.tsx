import React from 'react'
import { UserBadge, Support16, Avatar } from '@toptal/picasso'

const Example = () => (
  <div>
    <UserBadge
      name='Jacqueline Roque'
      title='UI specialist'
      avatar={
        <Avatar.Wrapper size='xsmall'>
          <Support16 color='white' />
        </Avatar.Wrapper>
      }
    />
  </div>
)

export default Example
