import React from 'react'
import styled from 'styled-components'
// In actual application you can simply do
// import Picasso, { Page, Container } from '@toptal/picasso'
import { default as Picasso, Page, Container } from '@toptal/picasso'

const Content = styled(Container)`
  flex: 1;
`

const App = () => (
  <Picasso>
    <Page>
      <Page.Header title='App Page' />
      <Page.Content>
        <Content top={7} bottom={7} flex justifyContent='center'>
          Your application goes here
        </Content>
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
