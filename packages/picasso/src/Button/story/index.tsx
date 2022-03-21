import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import AugmentationExample from './Augmentation.example'
import DefaultExample from './Default.example'
import DisabledExample from './Disabled.example'
import FullWidthExample from './FullWidth.example'
import IconButtonsWithTextExample from './IconButtonsWithText.example'
import LoadingExample from './Loading.example'
import SizesExample from './Sizes.example'
import StatesExample from './States.example'
import VariantsExample from './Variants.example'
import Button from '../Button'

export default {
  title: 'Components/Button/Normal',
  component: Button
} as ComponentMeta<typeof Button>

export const Default = DefaultExample
export const Augmentation = AugmentationExample
export const Disabled = DisabledExample
export const FullWidth = FullWidthExample
export const IconButtonsWithText = IconButtonsWithTextExample
export const Loading = LoadingExample
export const Sizes = SizesExample
export const States = StatesExample
export const Variants = VariantsExample
