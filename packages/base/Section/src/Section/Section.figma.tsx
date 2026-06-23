import figma from '@figma/code-connect'
import React from 'react'
import { Section, Button, ButtonCircular } from '@toptal/picasso'

const SECTION_HEAD_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=273-12085'

figma.connect(Section, SECTION_HEAD_URL, {
  props: {
    titleSize: figma.enum('Heading', {
      Small: 'small',
      Medium: 'medium',
      Large: 'medium',
    }),
    subtitle: figma.enum('Subheading', {
      True: 'Subheading',
      False: undefined,
    }),
    actions: figma.enum('Buttons', {
      Rectangle: (
        <Button size='small' variant='secondary'>
          Action
        </Button>
      ),
      Circle: <ButtonCircular variant='flat' icon={<span />} />,
      Mixed: (
        <Button size='small' variant='secondary'>
          Action
        </Button>
      ),
    }),
  },
  example: ({ titleSize, subtitle, actions }) => (
    <Section
      title='Section Title'
      titleSize={titleSize}
      subtitle={subtitle}
      actions={actions}
    />
  ),
})
