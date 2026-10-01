// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=17455-8930
// source=https://github.com/toptal/picasso/blob/master/packages/base/OverviewBlock/src/OverviewBlockCompound/index.ts
// component=OverviewBlock.Group

import figma from 'figma'

const variant = figma.selectedInstance.getPropertyValue('Variant')

const examples: Record<string, ReturnType<typeof figma.code>> = {
  Default: figma.code`<OverviewBlock.Group>
  <OverviewBlock value='4249' label='Label' />
  <OverviewBlock value='19302' label='Label' />
  <OverviewBlock value='979' label='Label' />
</OverviewBlock.Group>`,
  'Multi-line': figma.code`<OverviewBlock.Group>
  <OverviewBlock.Row>
    <OverviewBlock value='4249' label='Label' />
    <OverviewBlock value='19302' label='Label' />
  </OverviewBlock.Row>
  <OverviewBlock.Row>
    <OverviewBlock value='979' label='Label' />
    <OverviewBlock value='803' label='Label' />
  </OverviewBlock.Row>
</OverviewBlock.Group>`,
  'Empty state': figma.code`<OverviewBlock.Group>
  <OverviewBlock value='-' label='Label' />
</OverviewBlock.Group>`,
}
const example = examples[String(variant)]

export default (example
  ? {
      id: 'OverviewBlock.Group',
      imports: ["import { OverviewBlock } from '@toptal/picasso'"],
      example,
    }
  : {
      id: 'OverviewBlock.Group',
      imports: [],
      // "Slots" holds designer-defined content, so there is no representative snippet
      example: figma.code`// Not mapped: slot content is designer-defined`,
    }) satisfies CodeConnectTemplate
