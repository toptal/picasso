# Logo

The Toptal logo is the visual representation of the products we create.
    It was designed to be instantly recognizable to our users, partners and
    internal teams. Or goal is to ensure each logo instance contributes to our
    brand. This requires consistency in placement, scale, color and location.

## Props

### Logo

| Name | Type | Default | Description |
|------|------|---------|-------------|
| emblem | `boolean` | - | Whether logo should be shown as TT emblem or full word mark |
| variant | `"default" \| "white" \| "black" \| "grey" \| "blue"` | `default` | Variant of the `Logo` |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Logo } from '@toptal/picasso'

const Example = () => (
  <div>
    <Logo />
  </div>
)

export default Example
```

### Emblem

```tsx
import React from 'react'
import { Logo } from '@toptal/picasso'

const Example = () => (
  <div>
    <Logo emblem />
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import type { ContainerProps } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { Logo, Container } from '@toptal/picasso'
import type { PicassoSpacing } from '@toptal/picasso-provider/Picasso/config/spacings'

const Example = () => (
  <div>
    <div>
      <LogoContainer bgcolor='#ffffff' inline right={SPACING_4}>
        <Logo />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline right={SPACING_4}>
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
      <LogoContainer bgcolor='#ffffff' inline right={SPACING_4}>
        <Logo emblem />
      </LogoContainer>

      <LogoContainer bgcolor='#204ecf' inline right={SPACING_4}>
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
```
