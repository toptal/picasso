import React from 'react'
import { List, Container } from '@toptal/picasso'
import styled from 'styled-components'

const StyledListItem = styled(List.Item)`
  &:not(:last-child) {
    margin-bottom: 0;
  }
`

const DefaultExample = () => (
  <Container>
    <List>
      <List.Item style={{ marginBottom: 0 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </List.Item>
      <StyledListItem>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </StyledListItem>
      <StyledListItem>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </StyledListItem>
    </List>
  </Container>
)

export default DefaultExample
