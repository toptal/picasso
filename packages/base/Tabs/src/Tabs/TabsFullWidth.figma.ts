// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=14488-4136
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tabs/src/TabsCompound/index.ts
// component=Tabs

import figma from 'figma'

export default {
  id: 'Tabs',
  imports: ["import { Tabs } from '@toptal/picasso'"],
  example: figma.code`<Tabs value={0} onChange={() => { }} variant='fullWidth'>
        <Tabs.Tab label='Label'/>
        <Tabs.Tab label='Label'/>
        <Tabs.Tab label='Label'/>
      </Tabs>`,
} satisfies CodeConnectTemplate
