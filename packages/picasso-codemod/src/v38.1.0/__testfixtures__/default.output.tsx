// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Container } from '@toptal/picasso'

import { SPACING_4, SPACING_6, SPACING_12 } from '@toptal/picasso/utils';

const test = 'large'
const booleanVariable = true
const extraProps = { align: 'left '}

export default () => (
  <>
    <Container top={SPACING_4} someProp='small'>Content</Container>
    <Container right={test} someProp={1.5}>Content</Container>
    <Container bottom={SPACING_6}>Content</Container>
    <Container left={1.6}>Content</Container>
    <Container top={booleanVariable ? SPACING_4 : SPACING_6}>Content</Container>
    <Container {...extraProps}>Content</Container>
    <Dropdown
      someProp='small'
      offset={{
        top: SPACING_4,
        right: test,
        bottom: SPACING_12,
        left: 1.6
      }}
      content={
        <Menu>
          <Menu.Item>Menu item 1</Menu.Item>
        </Menu>
      }
    >
      Dropdown
    </Dropdown>
  </>
)
