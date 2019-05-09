import React from 'react'
import styled from 'styled-components'
import { Page, Grid } from '@toptal/picasso'

const LayoutExample = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.Header title='How to layout a page' />
      <Page.Content>
        <PageGrid spacing={0}>
          <PageGridItem medium={4} large={2}>
            Sidebar
          </PageGridItem>
          <PageGridItem medium={8} large={10}>
            Main Content
          </PageGridItem>
        </PageGrid>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const PageGrid = styled(Grid)`
  height: 100%;
  margin: 0;
`

const PageGridItem = styled(Grid.Item)`
  height: 100%;
`

export default LayoutExample
