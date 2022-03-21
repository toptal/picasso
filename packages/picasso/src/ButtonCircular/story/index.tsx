import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from '../../Button'
import * as icons from '../../Icon'

export default {
  title: 'Components/Button/Circular',
  component: Button.Circular,
  argTypes: {
    icon: {
      options: Object.keys(icons).filter(key => key.includes('16')),
      mapping: icons
    }
  }
} as ComponentMeta<typeof Button.Circular>

const Template: ComponentStory<typeof Button> = ({ icon, ...args}) => (
  <Button.Circular {...args} icon={React.createElement(icon)} />
)

export const Default = Template.bind({})
Default.args = { icon: 'Settings16' }
