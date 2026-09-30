// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=17455-8930
// source=https://github.com/toptal/picasso/blob/master/packages/base/OverviewBlock/src/OverviewBlockCompound/index.ts
// component=OverviewBlock.Group

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Variant') === 'Default') {
  template = {
    id: 'OverviewBlock.Group',
    imports: ["import { OverviewBlock } from '@toptal/picasso'"],
    example: figma.code`<OverviewBlock.Group>
      <OverviewBlock value='4249' label='Label'/>
      <OverviewBlock value='19302' label='Label'/>
      <OverviewBlock value='979' label='Label'/>
    </OverviewBlock.Group>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Multi-line'
) {
  template = {
    id: 'OverviewBlock.Group',
    imports: ["import { OverviewBlock } from '@toptal/picasso'"],
    example: figma.code`<OverviewBlock.Group>
      <OverviewBlock.Row>
        <OverviewBlock value='4249' label='Label'/>
        <OverviewBlock value='19302' label='Label'/>
      </OverviewBlock.Row>
      <OverviewBlock.Row>
        <OverviewBlock value='979' label='Label'/>
        <OverviewBlock value='803' label='Label'/>
      </OverviewBlock.Row>
    </OverviewBlock.Group>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Empty state'
) {
  template = {
    id: 'OverviewBlock.Group',
    imports: ["import { OverviewBlock } from '@toptal/picasso'"],
    example: figma.code`<OverviewBlock.Group>
      <OverviewBlock value='-' label='Label'/>
    </OverviewBlock.Group>`,
  }
} else {
  template = {
    id: 'OverviewBlock.Group',
    imports: ["import { OverviewBlock } from '@toptal/picasso'"],
    example: figma.code`<OverviewBlock.Group>
      <OverviewBlock value='-' label='Label'/>
    </OverviewBlock.Group>`,
  }
}

export default template
