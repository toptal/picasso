import type { ReactNode } from 'react'
import React from 'react'
import { PicassoLight } from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'
import { SPACING_12 } from '@toptal/picasso/utils'

const App = ({ children }: { children: ReactNode }) => (
  <PicassoLight>
    <Page>
      <Page.TopBar title='Picasso without any dependencies' />
      <Page.Content>
        <Page.Article>
          <Container
            flex
            justifyContent='center'
            top={SPACING_12}
            style={{ height: '14rem' }}
          >
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
