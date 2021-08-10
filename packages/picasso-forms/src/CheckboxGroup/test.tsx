import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import Checkbox from '../Checkbox'
import Form from '../Form'
import CheckboxGroup, { Props } from './CheckboxGroup'

const arrangeTest = ({ titleCase }: Partial<Props> = {}) =>
  render(
    <Form onSubmit={() => {}}>
      <CheckboxGroup
        required
        name='checkbox-group'
        label='Checkbox group label'
        titleCase={titleCase}
      >
        <Checkbox label='checkbox-label-0' value='checkbox-value-0' />
        <Checkbox label='checkbox-label-1' value='checkbox-value-1' />
      </CheckboxGroup>
    </Form>
  )

describe('CheckboxGroup', () => {
  it('shows the label in default case', () => {
    const { getByText } = arrangeTest()

    expect(getByText('Checkbox group label')).toBeInTheDocument()
  })

  it('shows the label in title case', () => {
    const { getByText } = arrangeTest({ titleCase: true })

    expect(getByText('Checkbox Group Label')).toBeInTheDocument()
  })
})
