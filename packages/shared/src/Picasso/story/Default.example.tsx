import React from 'react'
import styled from 'styled-components'
// In actual application you can simply do
// import Picasso, { Page, Container } from '@toptal/picasso'
import { default as Picasso, Page, Container } from '@toptal/picasso'

const ContentContainer = styled(Container)`
  flex: 1;
`

const App = () => (
  <Picasso loadFavicon={false} fixViewport={false}>
    <Page>
      <Page.TopBar title='App Page' />
      <Page.Content>
        <ContentContainer top={7} bottom={7} flex justifyContent='center'>
          Your application goes here
        </ContentContainer>
      </Page.Content>
      <Page.Footer />
    </Page>
  </Picasso>
)

const Index = () => (
  <div id='root'>
    <App />
  </div>
)

export default Index
