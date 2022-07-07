// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react'

import BarChart from '../BarChart'
import DefaultExample from './Default.example'
import CustomizedExample from './Customized.example'

export default {
  title: 'Components/BarChart',
  component: BarChart,
} as ComponentMeta<typeof BarChart>

export const Default = DefaultExample
export const Customized = CustomizedExample
