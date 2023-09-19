import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_2, palette } from '@toptal/picasso/utils'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary (Default)
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button.Circular icon={<Settings16 />} />
      <Button.Circular hovered icon={<Settings16 />} />
      <Button.Circular focused icon={<Settings16 />} />
      <Button.Circular active icon={<Settings16 />} />
      <Button.Circular loading icon={<Settings16 />} />
      <Button.Circular disabled icon={<Settings16 />} />
    </Container>

    <Typography variant='heading' size='small'>
      Flat
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button.Circular variant='flat' icon={<Settings16 />} />
      <Button.Circular variant='flat' hovered icon={<Settings16 />} />
      <Button.Circular variant='flat' focused icon={<Settings16 />} />
      <Button.Circular variant='flat' active icon={<Settings16 />} />
      <Button.Circular variant='flat' loading icon={<Settings16 />} />
      <Button.Circular variant='flat' disabled icon={<Settings16 />} />
    </Container>

    <Typography variant='heading' size='small'>
      Transparent
    </Typography>
    <Container
      inline
      top={SPACING_4}
      bottom={SPACING_8}
      style={{ backgroundColor: palette.blue.main }}
      padded={SPACING_2}
    >
      <Button.Circular variant='transparent' icon={<Settings16 />} />
      <Button.Circular variant='transparent' hovered icon={<Settings16 />} />
      <Button.Circular variant='transparent' focused icon={<Settings16 />} />
      <Button.Circular variant='transparent' active icon={<Settings16 />} />
      <Button.Circular variant='transparent' loading icon={<Settings16 />} />
      <Button.Circular variant='transparent' disabled icon={<Settings16 />} />
    </Container>
  </div>
)

export default Example
