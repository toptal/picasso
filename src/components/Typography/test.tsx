import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import Typography, { Props } from './Typography'

const renderTypography = (
  children: React.ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { align, weight, variant, size } = props

  return render(
    <Picasso loadFonts={false}>
      <Typography align={align} weight={weight} variant={variant} size={size}>
        {children}
      </Typography>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Typography', () => {
  test('default render', () => {
    const { container } = renderTypography('Just Typography', {})

    expect(container).toMatchSnapshot()
  })

  test('bold and center aligned render', () => {
    const { container } = renderTypography('Bold and center aligned', {
      weight: 'bold',
      align: 'center'
    })

    expect(container).toMatchSnapshot()
  })

  test('variant heading small render', () => {
    const { container } = renderTypography('Heading small', {
      variant: 'heading',
      size: 'small'
    })

    expect(container).toMatchSnapshot()
  })

  test('inherit size render', () => {
    const { container } = renderTypography('Inherit font size', {
      size: 'inherit'
    })

    expect(container).toMatchSnapshot()
  })
})
