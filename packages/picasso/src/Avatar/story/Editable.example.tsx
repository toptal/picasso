import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const Example = () => {
  const handleEdit = () => {
    window.alert('onEdit called')
  }

  return (
    <Container gap='medium' flex>
      <Avatar
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
        name='Jacqueline Roque'
        onEdit={handleEdit}
      />
      <Avatar name='Jacqueline Roque' onEdit={handleEdit} size='medium' />
    </Container>
  )
}

export default Example
