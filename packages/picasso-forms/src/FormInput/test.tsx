import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Form } from 'react-final-form'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import FormInput, { Props } from './FormInput'

const renderFormInput = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { name } = props

  return render(
    <Picasso loadFonts={false}>
      <Form
        onSubmit={values => console.log(values)}
        render={() => (
          <React.Fragment>
            <FormInput name={name}>{children}</FormInput>
          </React.Fragment>
        )}
      />
    </Picasso>
  )
}

describe('FormInput', () => {
  test('default render', () => {
    const { container } = renderFormInput(null, { name: 'test' })

    expect(container).toMatchSnapshot()
  })
})
