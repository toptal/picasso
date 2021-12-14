import React from 'react'
import { Radio, Container, Typography } from '@toptal/picasso'
import styled from 'styled-components'

const Label = styled.label`
  display: flex;
  cursor: pointer;
`

const List = styled.ul`
  padding-left: 20px;
  font-size: 12px;
  margin: 0;
`

const CustomRadio = () => {
  return (
    <Container flex alignItems='center'>
      <Container right='xsmall' flex alignItems='center'>
        <Radio id='id-1' />
      </Container>
      <Label htmlFor='id-1'>
        <Typography weight='semibold' size='large'>
          Payoneer
        </Typography>
      </Label>
    </Container>
  )
}

const Benefits = () => {
  return (
    <Container>
      <List>
        <li>
          <Typography size='small'>
            Similar benefits to Toptal Payments
          </Typography>
        </li>
        <li>
          <Typography size='small'>
            Instantly transfer funds to a prepaid card{' '}
          </Typography>
        </li>
      </List>
    </Container>
  )
}

const PayoneerLogo = () => {
  return (
    <Container flex alignItems='center'>
      <img src='./payoneer-logo.png' />
    </Container>
  )
}

const PayoneerPicker = () => {
  return (
    <Container
      flex
      alignItems='center'
      justifyContent='space-between'
      bottom='xsmall'
    >
      <CustomRadio />
      <PayoneerLogo />
    </Container>
  )
}

const Example = () => (
  <div>
    <Container rounded padded='medium' variant='blue' style={{ maxWidth: 400 }}>
      <PayoneerPicker />
      <Benefits />
    </Container>
  </div>
)

export default Example
