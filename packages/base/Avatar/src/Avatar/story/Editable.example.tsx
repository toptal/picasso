import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  const handleEdit = () => {
    window.alert('onEdit called')
  }

  return (
    <Container gap={SPACING_6} flex>
      <Avatar name='Jacqueline Roque' onEdit={handleEdit} />
      <Avatar
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
        name='Jacqueline Roque'
        size='medium'
        onEdit={handleEdit}
      />
    </Container>
  )
}

export default Example
