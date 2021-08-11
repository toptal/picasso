import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import Radio from '../Radio'
import Form from '../Form'
import RadioGroup, { Props } from './RadioGroup'

const arrangeTest = ({ titleCase }: Partial<Props> = {}) =>
  render(
    <Form onSubmit={() => {}}>
      <RadioGroup
        required
        name='radio-group'
        label='Radio group label'
        titleCase={titleCase}
      >
        <Radio label='radio-label-0' value='radio-value-0' />
        <Radio label='radio-label-1' value='radio-value-1' />
      </RadioGroup>
    </Form>
  )

describe('RadioGroup', () => {
  it('shows the label in default case', () => {
    const { getByText } = arrangeTest()

    expect(getByText('Radio group label')).toBeInTheDocument()
  })

  it('shows the label in title case', () => {
    const { getByText } = arrangeTest({ titleCase: true })

    expect(getByText('Radio Group Label')).toBeInTheDocument()
  })
})
