// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Container } from '@toptal/picasso'

const test = 'large'
const booleanVariable = true
const extraProps = { align: 'left '}

export default () => (
  <>
    <Container top='small' someProp='small'>Content</Container>
    <Container right={test} someProp={1.5}>Content</Container>
    <Container bottom={1.5}>Content</Container>
    <Container left={1.6}>Content</Container>
    <Container top={booleanVariable ? 'small' : 1.5}>Content</Container>
    <Container {...extraProps}>Content</Container>
    <Dropdown
      someProp='small'
      offset={{
        top: 'small',
        right: test,
        bottom: 3,
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
