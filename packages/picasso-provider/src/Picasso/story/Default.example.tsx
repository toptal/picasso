import React from 'react'
// In actual application you can simply do
// import Picasso from '@toptal/picasso-provider'
import { default as Picasso } from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'
import { SPACING_12 } from '@toptal/picasso-utils'

const App = () => (
  <Picasso
    loadFavicon={false}
    fixViewport={false}
    preventPageWidthChangeOnScrollbar={false}
  >
    <Page>
      <Page.TopBar title='App Page' />
      <Page.Content>
        <Page.Article>
          <Container
            flex
            justifyContent='center'
            top={SPACING_12}
            style={{ height: '14rem' }}
          >
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
