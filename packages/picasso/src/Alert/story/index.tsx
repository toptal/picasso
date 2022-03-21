import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Alert from '../Alert'

export default {
  title: 'Components/Alert',
  component: Alert
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />

export const Default = Template.bind({})
export const Yellow = Template.bind({})
export const Red = Template.bind({})
export const Blue = Template.bind({})
export const Green = Template.bind({})

Default.args = { children: 'This is warning alert' }
Yellow.args = { variant: 'yellow', children: 'This is warning alert' }
Red.args = { variant: 'red', children: 'This is critical warning alert' }
Blue.args = { variant: 'blue', children: 'This is info alert' }
Green.args = { variant: 'green', children: 'This is success alert' }
