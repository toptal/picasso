// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12174-37495
// source=https://github.com/toptal/picasso/blob/master/packages/picasso-rich-text-editor/src/RichTextEditor/RichTextEditor.tsx
// component=RichTextEditor

import figma from 'figma'

const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
})
const status = figma.selectedInstance.getEnum('State', {
  Error: 'error',
  'Error Focus': 'error',
})

export default {
  id: 'RichTextEditor',
  imports: [
    "import { RichTextEditor } from '@toptal/picasso-rich-text-editor'",
  ],
  example: figma.code`<RichTextEditor id='rich-text-editor' onChange={() => { }}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('status', status)}/>`,
  metadata: { nestable: true },
}
