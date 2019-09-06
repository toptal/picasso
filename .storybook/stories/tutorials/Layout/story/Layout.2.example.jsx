import React from 'react'
import styled from 'styled-components'
import { Page, Container } from '@toptal/picasso'

const LayoutExample = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.Header title='How to layout a page' />
      <Page.Content>
        <StyledContentContainer flex>
          <Container padded='small'>Sidebar</Container>
          <Container padded='small'>Main Content</Container>
        </StyledContentContainer>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const StyledContentContainer = styled(Container)`
  height: 100%;
`

export default LayoutExample
