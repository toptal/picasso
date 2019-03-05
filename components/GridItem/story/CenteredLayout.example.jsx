import React from 'react'
import { Grid, Page, Typography } from '@toptal/picasso'

const GridCenteredLayoutExample = () => (
  <Page>
    <Page.Header title='Onboarding' />
    <Page.Content>
      <Grid justify='center'>
        <Grid.Item small={8}>
          <SampleContainer>Content</SampleContainer>
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

export default GridCenteredLayoutExample
