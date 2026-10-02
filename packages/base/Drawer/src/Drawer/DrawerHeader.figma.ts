// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12346-38754
// source=https://github.com/toptal/picasso/blob/master/packages/base/Drawer/src/Drawer/Drawer.tsx
// component=Drawer

import figma from 'figma'

// Drawer has no header component: the header comes from the `title` prop, so
// selecting the header shows the Drawer that renders it, with its real title.
// "Header CTA", "Seperator" and "Badge Count" have no Drawer prop.
const title = figma.selectedInstance.findText('Title').__render__()

export default {
  id: 'Drawer',
  imports: ["import { Drawer } from '@toptal/picasso'"],
  example: figma.code`<Drawer open${figma.helpers.react.renderProp(
    'title',
    title
  )} onClose={() => { }}>
        Drawer content
      </Drawer>`,
} satisfies CodeConnectTemplate
