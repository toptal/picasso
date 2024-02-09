import React from 'react'
import { Page, Logo, Typography, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'
import {
  Jobs16,
  Home16,
  Candidates16,
  Team16,
  Participants16,
} from '@toptal/picasso-icons'

const Menu = ({ size }: { size: 'small' | 'medium' | 'large' }) => (
  <Page.Sidebar size={size}>
    <Page.Sidebar.Logo>
      <Logo />
    </Page.Sidebar.Logo>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Home16 />} selected>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Candidates16 />}>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const Example = () => (
  <Container flex gap={SPACING_8}>
    <Container>
      <Typography variant='heading' size='xsmall'>
        Small (212px)
      </Typography>
      <Menu size='small' />
    </Container>
    <Container>
      <Typography variant='heading' size='xsmall'>
        Medium (236px)
      </Typography>
      <Menu size='medium' />
    </Container>
    <Container>
      <Typography variant='heading' size='xsmall'>
        Large (280px)
      </Typography>
      <Menu size='large' />
    </Container>
  </Container>
)

export default Example
