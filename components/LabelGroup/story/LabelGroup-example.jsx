import React from 'react'

import Label from '../../Label'

const LabelGroupExample = () => (
  <Label.Group>
    <Label label='Angular JS' variant='flat' />
    <Label label='React JS' variant='success' />
    <Label label='Ember JS' onDelete={handleDelete} />
    <Label label='Vue JS' />
  </Label.Group>
)

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

export default LabelGroupExample
