import type { ReactNode } from 'react'
import React from 'react'
import { PicassoLight } from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'

const App = ({ children }: { children: ReactNode }) => (
  <PicassoLight>
    <Page>
      <Page.TopBar title='Picasso without any dependencies' />
      <Page.Content>
        <Page.Article>
          <Container top={7} bottom={7} flex justifyContent='center'>
            {children}
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </PicassoLight>
)

const Index = () => (
  <div id='root'>
    <App>Your application without adding any utility components</App>
  </div>
)

export default Index
