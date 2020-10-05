import React from 'react'
import {
  AccountSelect,
  Grid,
  Page,
  Container,
  Typography,
  Logo
} from '@toptal/picasso'

const accounts = [
  {
    id: '1',
    name: 'Phil Leif',
    position: 'Account Owner at Stowaway Cosmetics'
  },
  {
    id: '2',
    href: '#',
    name: 'Phil Leif',
    position: 'Company Representative at Marketing Works'
  },
  {
    id: '3',
    href: '#',
    name: 'Phil Leif',
    position: 'Talent',
    avatar: './jacqueline-with-flowers-1954-square.jpg'
  }
]

const Example = () => (
  <Page>
    <Page.Content>
      <Grid justifyContent='center'>
        <Grid.Item>
          <Container flex direction='column' alignItems='center'>
            <Logo emblem />
            <Typography variant='heading' size='large'>
              Select an Account
            </Typography>
          </Container>
          <Container top={2}>
            <AccountSelect
              accounts={accounts}
              onSelect={account => console.log(account)}
            />
          </Container>
        </Grid.Item>
      </Grid>
    </Page.Content>
  </Page>
)

export default Example
