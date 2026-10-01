// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=17921-38502
// source=https://github.com/toptal/picasso/blob/master/packages/base/Dropdown/src/DropdownCompound/index.ts
// component=Dropdown

import figma from 'figma'

export default {
  id: 'Dropdown',
  imports: ["import { Dropdown, Menu } from '@toptal/picasso'"],
  example: figma.code`<Dropdown content={<Menu>
            <Menu.Item onClick={() => { }}>Item 1</Menu.Item>
            <Menu.Item onClick={() => { }}>Item 2</Menu.Item>
            <Menu.Item onClick={() => { }}>Item 3</Menu.Item>
          </Menu>}>
        Open Dropdown
        <Dropdown.Arrow />
      </Dropdown>`,
} satisfies CodeConnectTemplate
