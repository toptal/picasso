import React from 'react'
import { Page, Container, Stepper, Button, Menu, Bell16 } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.TopBar
        variant='light'
        title='Light'
        actionItems={
          <Stepper
            hideLabels
            active={3}
            steps={['', '', '', 'Schedule Matching Call']}
          />
        }
      />
    </Container>

    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.TopBar
        variant='dark'
        title='Dark'
        actionItems={
          <Container right='medium'>
            <Button variant='transparent'>Create job</Button>
          </Container>
        }
      />
    </Container>

    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.TopBar
        variant='black'
        title='Black'
        actionItems={
          <Container right='medium'>
            <Button.Circular variant='transparent' icon={<Bell16 />} />
          </Container>
        }
        rightContent={
          <Page.TopBarMenu
            name='Jacqueline Roque'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          >
            <Menu>
              <Menu.Item>My Account</Menu.Item>
              <Menu.Item>Log Out</Menu.Item>
            </Menu>
          </Page.TopBarMenu>
        }
      />
    </Container>
  </div>
)

export default Example
