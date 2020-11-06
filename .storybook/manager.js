import { create } from '@storybook/theming'
import { addons } from '@storybook/addons'

const theme = create({
  base: 'light',
  brandTitle: 'Picasso',
  brandImage:
    'https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png'
})

addons.setConfig({
  showPanel: false,
  theme
})
