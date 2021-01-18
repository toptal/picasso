import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Typography, { Props } from './Typography'

jest.mock('ap-style-title-case')

const TestTypography: FunctionComponent<OmitInternalProps<Props>> = ({
  align,
  weight,
  variant,
  size,
  titleCase,
  children
}) => (
  <Typography
    align={align}
    weight={weight}
    variant={variant}
    size={size}
    titleCase={titleCase}
  >
    {children}
  </Typography>
)

let spiedOnTitleCase: jest.SpyInstance

beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

describe('Typography', () => {
  it('default render', () => {
    const { container } = render(
      <TestTypography>Just Typography</TestTypography>
    )

    expect(container).toMatchSnapshot()
  })

  it('variant heading small render', () => {
    const { container } = render(
      <TestTypography variant='heading' size='small'>
        Heading small
      </TestTypography>
    )

    expect(container).toMatchSnapshot()
  })

  it('inherit size render', () => {
    const { container } = render(
      <TestTypography size='inherit'>Inherit font size</TestTypography>
    )

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when titleCase property is true', () => {
    const TEXT_CONTENT = 'Test bh6'

    render(<TestTypography titleCase>{TEXT_CONTENT}</TestTypography>)

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })
})
