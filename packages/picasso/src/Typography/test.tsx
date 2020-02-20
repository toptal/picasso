import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Typography, { Props } from './Typography'

const TestTypography: FunctionComponent<OmitInternalProps<Props>> = ({
  align,
  weight,
  variant,
  size,
  children
}) => (
  <Typography align={align} weight={weight} variant={variant} size={size}>
    {children}
  </Typography>
)

describe('Typography', () => {
  test('default render', () => {
    const { container } = render(
      <TestTypography>Just Typography</TestTypography>
    )

    expect(container).toMatchSnapshot()
  })

  test('variant heading small render', () => {
    const { container } = render(
      <TestTypography variant='heading' size='small'>
        Heading small
      </TestTypography>
    )

    expect(container).toMatchSnapshot()
  })

  test('inherit size render', () => {
    const { container } = render(
      <TestTypography size='inherit'>Inherit font size</TestTypography>
    )

    expect(container).toMatchSnapshot()
  })
})
