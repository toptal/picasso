import React from 'react'
import { Button } from '@toptal/picasso'
import { ComponentStory } from '@storybook/react'

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

const Example = Template.bind({})

Example.args = { children: 'default' }

export default Example
