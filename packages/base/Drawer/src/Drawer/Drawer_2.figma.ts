// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12346-38754
// source=https://github.com/toptal/picasso/blob/master/packages/base/Drawer/src/Drawer/Drawer.tsx
// component=Drawer

import figma from 'figma'

export default {
  id: 'Drawer',
  imports: ["import { Drawer } from '@toptal/picasso'"],
  example: figma.code`<Drawer open title='Drawer title' onClose={() => { }}>
        Drawer content
      </Drawer>`,
}
