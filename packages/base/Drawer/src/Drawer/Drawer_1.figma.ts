// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12346-39116
// source=https://github.com/toptal/picasso/blob/master/packages/base/Drawer/src/Drawer/Drawer.tsx
// component=Drawer

import figma from 'figma'

const width = figma.selectedInstance.getEnum('Size', {
  Narrow: 'narrow',
  Regular: 'regular',
  Medium: 'medium',
  Wide: 'wide',
  'Ultra Wide': 'ultra-wide',
})

export default {
  id: 'Drawer',
  imports: ["import { Drawer } from '@toptal/picasso'"],
  example: figma.code`<Drawer open title='Drawer title'${figma.helpers.react.renderProp(
    'width',
    width
  )} onClose={() => { }}>
        Drawer content
      </Drawer>`,
  metadata: { nestable: true },
}
