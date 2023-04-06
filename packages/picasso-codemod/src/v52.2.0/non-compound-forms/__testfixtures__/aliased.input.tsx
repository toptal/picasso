// eslint-disable-file
import { Form as PicassoForm } from '@toptal/picasso-forms'
import React from 'react'

const Example = () => {
  return (
    <PicassoForm autoComplete='off' onSubmit={values => () => values}>
      <PicassoForm.Input
        enableReset
        onResetClick={(set: (value: string) => void) => {
          set('')
        }}
        required
        name='default-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <PicassoForm.Rating.Thumbs
        name='default-thumbs'
        label='Would you recommend picasso?'
        required
      />
    </PicassoForm>
  )
}
