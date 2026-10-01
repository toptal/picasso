// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12247-43855
// source=https://github.com/toptal/picasso/blob/master/packages/base/Modal/src/ModalCompound/index.ts
// component=Modal

import figma from 'figma'

// "Device" is not mapped: the Modal code is the same on every device
const size = figma.selectedInstance.getEnum('Size', {
  xs: 'xsmall',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'xlarge',
})

export default {
  id: 'Modal',
  imports: ["import { Button, Modal } from '@toptal/picasso'"],
  example: figma.code`<Modal open${figma.helpers.react.renderProp(
    'size',
    size
  )} onClose={() => {}}>
  <Modal.Title>Title</Modal.Title>
  <Modal.Content>Modal content</Modal.Content>
  <Modal.Actions>
    <Button variant='secondary'>Cancel</Button>
    <Button>Confirm</Button>
  </Modal.Actions>
</Modal>`,
}
