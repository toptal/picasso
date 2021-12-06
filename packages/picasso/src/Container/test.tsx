import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Container, { Props, VariantType } from './Container'

const colors = ['red', 'green', 'white', 'yellow', 'blue', 'grey']

const variants = Object.fromEntries(
  new Map(colors.map(color => [color, color]))
)

const renderContainer = (props: OmitInternalProps<Props>) => {
  const { children, ...rest } = props

  return render(<Container {...rest}>{children}</Container>)
}

describe('Container', () => {
  it('renders default container', () => {
    const { container } = renderContainer({ children: 'Some text' })

    expect(container).toMatchSnapshot()
  })

  it.each([...colors] as VariantType[])(
    'renders with borders but only white container has one',
    variant => {
      const { container, getByTestId } = renderContainer({
        children: `${variant} container`,
        'data-testid': `${variant}-container`,
        bordered: true,
        variant
      })

      const variantContainer = getByTestId(`${variant}-container`)

      expect(variantContainer.className).toContain(`${variant}Variant`)
      if (variant !== variants.white) {
        expect(variantContainer.className).not.toContain('bordered')
      } else {
        expect(variantContainer.className).toContain('bordered')
      }

      expect(container).toMatchSnapshot()
    }
  )
})
