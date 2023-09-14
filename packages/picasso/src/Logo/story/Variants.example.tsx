import React from 'react'
import type { ContainerProps } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso/utils'
import { Logo, Container } from '@toptal/picasso'
import type { PicassoSpacing } from '@toptal/picasso-provider/Picasso/config/spacings'

const Example = () => (
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

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo variant='grey' />
      </LogoContainer>
    </div>

    <Container top={SPACING_8}>
      <LogoContainer bgcolor='#ffffff' inline right='small'>
        <Logo emblem />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline right='small'>
        <Logo emblem variant='white' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo emblem variant='black' />
      </LogoContainer>

      <LogoContainer bgcolor='#ffffff' inline>
        <Logo emblem variant='grey' />
      </LogoContainer>
    </Container>
  </div>
)

type LogoContainerProps = Pick<
  ContainerProps,
  'right' | 'children' | 'inline'
> & { bgcolor: string }

const LogoContainer = ({
  children,
  bgcolor,
  inline,
  right,
}: LogoContainerProps) => (
  <Container
    inline={inline}
    right={right as PicassoSpacing}
    padded={SPACING_8}
    style={{ backgroundColor: bgcolor }}
  >
    {children}
  </Container>
)

export default Example
