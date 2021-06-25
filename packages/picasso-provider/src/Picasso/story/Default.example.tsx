import React from 'react'
// In actual application you can simply do
// import Picasso from '@toptal/picasso-provider'
import { default as Picasso } from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'

const App = () => (
  <Picasso loadFavicon={false} fixViewport={false}>
    <Page>
      <Page.TopBar title='App Page' />
      <Page.Content>
        <Page.Article>
          <Container top={7} bottom={7} flex justifyContent='center'>
            Your application goes here
          </Container>
        </Page.Article>
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
