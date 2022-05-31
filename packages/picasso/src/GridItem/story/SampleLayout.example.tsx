import React from 'react'
import { Grid, Page, Typography } from '@toptal/picasso'

const Example = () => (
  <Page>
    <Page.TopBar title='Onboarding' />
    <Page.Content>
      <Grid>
        <Grid.Item small={8}>
          <SampleContainer>Main Content</SampleContainer>
        </Grid.Item>

        <Grid.Item small={4}>
          <SampleContainer>Sidebar</SampleContainer>
        </Grid.Item>
      </Grid>
    </Page.Content>
    <Page.Footer />
  </Page>
)

type Props = { children: React.ReactNode }

const SampleContainer = ({ children }: Props) => (
  <div
    style={{
      height: '20rem',
      backgroundColor: '#dfe3e9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography>{children}</Typography>
  </div>
)

export default Example
