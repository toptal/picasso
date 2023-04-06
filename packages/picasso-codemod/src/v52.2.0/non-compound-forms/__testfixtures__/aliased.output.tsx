// eslint-disable-file
import { FormNonCompound, Input, Rating } from '@toptal/picasso-forms';
import React from 'react'

const Example = () => {
  return (
    <FormNonCompound autoComplete='off' onSubmit={values => () => values}>
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
      <Rating.Thumbs
        name='default-thumbs'
        label='Would you recommend picasso?'
        required
      />
    </FormNonCompound>
  );
}
