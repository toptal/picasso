import { FormNonCompound as Form, Input } from '@toptal/picasso-forms'
import React from 'react'

const Example = () => {
  return (
    <Form
      autoComplete='off'
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      layout='horizontal'
      labelWidth={{ md: 4, lg: 3, xl: 2 }}
    >
      <Input
        enableReset
        onResetClick={(set: (value: string) => void) => {
          set('')
        }}
        required
        name='default-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
    </Form>
  )
}

export default Example
