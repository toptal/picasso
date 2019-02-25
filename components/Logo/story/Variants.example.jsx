import React from 'react'

import Logo from '../Logo'
import Spacer from '../../Spacer'

const LogoVariantsExample = () => (
  <div>
    <div>
      <Container bgcolor='#ffffff'>
        <Logo />
      </Container>
      <Spacer inline right={1} />

      <Container bgcolor='#204ecf'>
        <Logo variant='white' />
      </Container>
      <Spacer inline right={1} />

      <Container bgcolor='#ffffff'>
        <Logo variant='black' />
      </Container>
    </div>

    <Spacer top={2}>
      <Container bgcolor='#ffffff'>
        <Logo emblem />
      </Container>
      <Spacer inline right={1} />

      <Container bgcolor='#204ecf'>
        <Logo emblem variant='white' />
      </Container>
      <Spacer inline right={1} />

      <Container bgcolor='#ffffff'>
        <Logo emblem variant='black' />
      </Container>
    </Spacer>
  </div>
)

const Container = ({ children, bgcolor }) => (
  <div
    style={{
      backgroundColor: bgcolor,
      display: 'inline-block',
      padding: '2em'
    }}
  >
    {children}
  </div>
)

export default LogoVariantsExample
