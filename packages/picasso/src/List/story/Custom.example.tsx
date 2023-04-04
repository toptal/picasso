import React from 'react'
import { Referrals16 } from '@toptal/picasso/Icon'
import { List, Container } from '@toptal/picasso'

const DefaultExample = () => (
  <Container bottom='medium'>
    <List>
      <List.Item icon={<Referrals16 />}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </List.Item>
      <List.Item icon={<Referrals16 color='green' />}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </List.Item>
      <List.Item icon={<Referrals16 />}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </List.Item>
    </List>

    <List variant='ordered'>
      <List.Item>
        Adipisicing quidem amet aspernatur aliquam aliquam ex? Dicta non
        doloremque.
      </List.Item>
      <List.Item>
        Adipisicing quidem amet aspernatur aliquam aliquam ex? Dicta non
        doloremque.
        <List>
          <List.Item icon={<Referrals16 />}>
            Adipisicing officia quae adipisicing eaque consequuntur provident.
          </List.Item>
          <List.Item icon={<Referrals16 color='green' />}>
            Sit quam labore facilis dicta.
          </List.Item>
        </List>
      </List.Item>
    </List>

    <List variant='unordered'>
      <List.Item>
        Adipisicing quidem amet aspernatur aliquam aliquam ex? Dicta non
        doloremque.
      </List.Item>
      <List.Item>
        Adipisicing quidem amet aspernatur aliquam aliquam ex? Dicta non
        doloremque.
        <List>
          <List.Item icon={<Referrals16 />}>
            Adipisicing officia quae adipisicing eaque consequuntur provident.
          </List.Item>
          <List.Item icon={<Referrals16 color='green' />}>
            Sit quam labore facilis dicta.
          </List.Item>
        </List>
      </List.Item>
    </List>
  </Container>
)

export default DefaultExample
