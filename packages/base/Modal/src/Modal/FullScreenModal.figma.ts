// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12713-42200
// source=https://github.com/toptal/picasso/blob/master/packages/base/Modal/src/ModalCompound/index.ts
// component=Modal

import figma from 'figma'

export default {
  id: 'Modal',
  imports: ["import { Button, Modal } from '@toptal/picasso'"],
  example: figma.code`<Modal open size='full-screen' onClose={() => {}}>
  <Modal.Title>Title</Modal.Title>
  <Modal.Content>Modal content</Modal.Content>
  <Modal.Actions>
    <Button variant='secondary'>Cancel</Button>
    <Button>Confirm</Button>
  </Modal.Actions>
</Modal>`,
}
