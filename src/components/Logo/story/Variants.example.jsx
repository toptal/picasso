import React from 'react'
import { Logo, Container } from '@toptal/picasso'

const LogoVariantsExample = () => (
  <div>
    <div>
      <LogoContainer bgcolor='#ffffff' inline right='small'>
        <Logo />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline right='small'>
        <Logo variant='white' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo variant='black' />
      </LogoContainer>
    </div>

    <Container top='large'>
      <LogoContainer bgcolor='#ffffff' inline right='small'>
        <Logo emblem />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline right='small'>
        <Logo emblem variant='white' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo emblem variant='black' />
      </LogoContainer>
    </Container>
  </div>
)

const LogoContainer = ({ children, bgcolor, ...rest }) => (
  <Container {...rest} padded='large' style={{ backgroundColor: bgcolor }}>
    {children}
  </Container>
)

export default LogoVariantsExample
