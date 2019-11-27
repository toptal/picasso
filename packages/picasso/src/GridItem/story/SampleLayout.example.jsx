import React from 'react'
import { Grid, Page, Typography } from '@toptal/picasso'

const GridSampleLayoutExample = () => (
  <Page>
    <Page.Header title='Onboarding' />
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

const SampleContainer = ({ children }) => (
  <div
    style={{
      height: '20rem',
      backgroundColor: '#dfe3e9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Typography>{children}</Typography>
  </div>
)

export default GridSampleLayoutExample
