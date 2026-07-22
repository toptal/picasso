import React from 'react'
import { Dropdown, Menu, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_2}>
      <Typography>
        Offset can vary per breakpoint — small offset from the `sm` screen,
        large from `lg` (mobile-first, like Container spacing props)
      </Typography>
    </Container>
    <Container flex inline>
      <Dropdown
        content={
          <Menu>
            <Menu.Item>First item</Menu.Item>
            <Menu.Item>Second item</Menu.Item>
            <Menu.Item>Third item</Menu.Item>
          </Menu>
        }
        offset={{ top: { sm: SPACING_2, lg: SPACING_8 } }}
      >
        Responsive offset Dropdown
        <Dropdown.Arrow />
      </Dropdown>
    </Container>
  </div>
)

export default Example
