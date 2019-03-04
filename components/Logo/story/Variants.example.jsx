import React from 'react'
import { Logo, Container } from '@toptal/picasso'

const LogoVariantsExample = () => (
  <div>
    <div>
      <LogoContainer bgcolor='#ffffff' inline right={1}>
        <Logo />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline right={1}>
        <Logo variant='white' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo variant='black' />
      </LogoContainer>
    </div>

    <Container top={2}>
      <LogoContainer bgcolor='#ffffff' inline right={1}>
        <Logo emblem />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline right={1}>
        <Logo emblem variant='white' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo emblem variant='black' />
      </LogoContainer>
    </Container>
  </div>
)

const LogoContainer = ({ children, bgcolor, ...rest }) => (
  <Container {...rest} style={{ backgroundColor: bgcolor, padding: '2em' }}>
    {children}
  </Container>
)

export default LogoVariantsExample
