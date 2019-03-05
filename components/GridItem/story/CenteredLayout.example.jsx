import React from 'react'
import { Grid, Header, Footer, Typography } from '@toptal/picasso'

const GridCenteredLayoutExample = () => (
  <div>
    <Header title='Onboarding' />
    <div
      style={{
        boxSizing: 'border-box',
        padding: '0 1rem',
        maxWidth: '75rem',
        margin: '0 auto'
      }}
    >
      <Grid justify='center'>
        <Grid.Item small={8}>
          <SampleContainer>Content</SampleContainer>
        </Grid.Item>
      </Grid>
    </div>
    <Footer />
  </div>
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
