// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=65-34
// source=https://github.com/toptal/picasso/blob/master/packages/base/EnvironmentBanner/src/EnvironmentBanner/EnvironmentBanner.tsx
// component=EnvironmentBanner

import figma from 'figma'

const environment = figma.selectedInstance.getEnum('Variant', {
  Development: 'development',
  Temploy: 'temploy',
  Staging: 'staging',
})

export default {
  id: 'EnvironmentBanner',
  imports: ["import { EnvironmentBanner } from '@toptal/picasso'"],
  example: figma.code`<EnvironmentBanner${figma.helpers.react.renderProp(
    'environment',
    environment
  )} productName='Picasso'/>`,
  metadata: { nestable: true },
}
