import React from 'react'
import { Logo, Container } from '@toptal/picasso'

const LogoVariantsExample = () => (
  <div>
    <div>
      <LogoContainer bgcolor='#ffffff' inline mr={1}>
        <Logo />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline mr={1}>
        <Logo variant='white' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo variant='black' />
      </LogoContainer>
    </div>

    <Container mt={2}>
      <LogoContainer bgcolor='#ffffff' inline mr={1}>
        <Logo emblem />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline mr={1}>
        <Logo emblem variant='white' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo emblem variant='black' />
      </LogoContainer>
    </Container>
  </div>
)

const LogoContainer = ({ children, bgcolor, ...rest }) => (
  <Container {...rest} p={2} style={{ backgroundColor: bgcolor }}>
    {children}
  </Container>
)

export default LogoVariantsExample
