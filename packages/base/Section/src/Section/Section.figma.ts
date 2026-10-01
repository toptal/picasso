// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=273-12085
// source=https://github.com/toptal/picasso/blob/master/packages/base/Section/src/Section/Section.tsx
// component=Section

import figma from 'figma'

const titleSize = figma.selectedInstance.getEnum('Heading', {
  Small: 'small',
  Medium: 'medium',
  // Section titles come in small and medium only
  Large: 'medium',
})
const subtitle = figma.selectedInstance.getEnum('Subheading', {
  True: 'Subheading',
  False: undefined,
})
const actions = figma.selectedInstance.getEnum('Buttons', {
  Rectangle: figma.helpers.react.jsxElement(
    "<Button size='small' variant='secondary'>\n          Action\n        </Button>"
  ),
  Circle: figma.helpers.react.jsxElement(
    "<ButtonCircular variant='flat' icon={<Settings16 />} />"
  ),
  Mixed: figma.helpers.react.jsxElement(
    "<Button size='small' variant='secondary'>\n          Action\n        </Button>"
  ),
})

export default {
  id: 'Section',
  imports: [
    "import { Section, Button, ButtonCircular, Settings16 } from '@toptal/picasso'",
  ],
  example: figma.code`<Section title='Section Title'${figma.helpers.react.renderProp(
    'titleSize',
    titleSize
  )}${figma.helpers.react.renderProp(
    'subtitle',
    subtitle
  )}${figma.helpers.react.renderProp('actions', actions)}/>`,
  metadata: { nestable: true },
}
