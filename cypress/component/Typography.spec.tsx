import React from 'react'
import type { TypographyProps } from '@toptal/picasso'
import { Container, Typography } from '@toptal/picasso'
import { capitalize, SPACING_2 } from '@toptal/picasso-utils'

const component = 'Typography'

type Variant = NonNullable<TypographyProps['variant']>
type Size = NonNullable<TypographyProps['size']>

const SIZES: Size[] = [
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'inherit',
]

const SIZE_VARIANT: Record<Variant, Size[]> = {
  heading: SIZES,
  body: SIZES,
}

const variants = Object.keys(SIZE_VARIANT) as Variant[]

const AllVariants = ({ weight }: { weight?: TypographyProps['weight'] }) => (
  <Container padded={SPACING_2}>
    <Typography variant='heading'>{weight ? weight : 'unset'}</Typography>
    <br />
    {variants.map(variant => (
      <Container key={variant} bottom='small'>
        {SIZE_VARIANT[variant].map(size => (
          <Typography
            variant={variant}
            data-testid={`${variant}${size}`}
            key={`${variant}${size}`}
            size={size}
            weight={weight}
          >
            {capitalize(variant)} {capitalize(size)}
          </Typography>
        ))}
      </Container>
    ))}
  </Container>
)

describe('Typography', () => {
  it('renders all possible variants', () => {
    cy.mount(
      <Container
        padded={SPACING_2}
        flex
        justifyContent='space-around'
        style={{ maxWidth: '800px' }}
        data-testid={component}
      >
        <AllVariants />
        <AllVariants weight='semibold' />
        <AllVariants weight='regular' />
        <AllVariants weight='inherit' />
      </Container>
    )

    // Temporary disabling this screenshot as fonts stopped working in modals
    cy.getByTestId(component).happoScreenshot({
      component,
      variant: 'all-variants',
    })
  })
})
