import React from 'react'
import {
  Page,
  Tag,
  Logo,
  Container,
  Typography,
  Grid
} from '@toptal/picasso'
import {
  Jobs16,
  Overview16,
  Candidates16,
  Team16,
  Participants16,
  Billing16,
  LegalInfo16,
  Referrals16,
  Resources16,
  ReferralBonus16,
  Help16
} from '@toptal/picasso/Icon'

const sidebarLight = (
  <Page.Sidebar variant='light'>
    <Page.Sidebar.Logo>
      <Logo />
    </Page.Sidebar.Logo>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />} selected>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Candidates16 />}>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Billing16 />} disabled>
        Billing
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<LegalInfo16 />}>
        <Typography size='medium' color='inherit'>
          Legal Info
        </Typography>
        <Container left='medium'>
          <Tag>5</Tag>
        </Container>
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Resources16 />}>Resources</Page.Sidebar.Item>
    </Page.Sidebar.Menu>

    <Page.Sidebar.Menu bottom>
      <Page.Sidebar.Item icon={<Candidates16 />}>Opportunities</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<ReferralBonus16 />}>Referral Bonus</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Help16 />}>Help</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const sidebarDark = (
  <Page.Sidebar variant='dark'>
    <Page.Sidebar.Logo>
      <Logo variant='white' />
    </Page.Sidebar.Logo>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />} selected>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Candidates16 />}>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Billing16 />} disabled>
        Billing
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<LegalInfo16 />}>
        <Typography size='medium' color='inherit'>
          Legal Info
        </Typography>
        <Container left='medium'>
          <Tag>5</Tag>
        </Container>
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Resources16 />}>Resources</Page.Sidebar.Item>
    </Page.Sidebar.Menu>

    <Page.Sidebar.Menu bottom>
      <Page.Sidebar.Item icon={<Candidates16 />}>Opportunities</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<ReferralBonus16 />}>Referral Bonus</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Help16 />}>Help</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const Example = () => (
  <Grid spacing={32}>
    <Grid.Item style={{ height: '58rem' }}>
      <Container bottom='small'>
        <Typography variant='heading' size='small'>
          Light (default):
        </Typography>
      </Container>
      {sidebarLight}
    </Grid.Item>

    <Grid.Item style={{ height: '58rem' }}>
      <Container bottom='small'>
        <Typography variant='heading' size='small'>
          Dark:
        </Typography>
      </Container>
      {sidebarDark}
    </Grid.Item>
  </Grid>
)

export default Example
