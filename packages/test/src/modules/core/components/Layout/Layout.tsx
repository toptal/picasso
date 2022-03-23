import React, { ReactNode } from 'react'
import { Page, Container } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  title: string
  children: ReactNode
}

const Layout = ({ title, children }: Props) => (
  <Page>
    <Page.TopBar title={title} />
    <Page.Content>
      <Container css={S.container} top='small' bottom='small'>
        {children}
      </Container>
    </Page.Content>
    <Page.Footer />
  </Page>
)

Layout.displayName = 'Layout'

export default Layout
