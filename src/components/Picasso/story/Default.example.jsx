import React from 'react'
import { default as Picasso, Page, Container } from '@toptal/picasso'

const App = () => (
  <Picasso>
    <Page>
      <Page.Header title='App Page' />
      <Page.Content>
        <Container top={7} bottom={7} flex justifyContent='center'>
          Your application goes here
        </Container>
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
