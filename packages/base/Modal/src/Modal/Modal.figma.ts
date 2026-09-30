// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12247-43855
// source=https://github.com/toptal/picasso/blob/master/packages/base/Modal/src/ModalCompound/index.ts
// component=Modal

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Size') === 'xs') {
  template = {
    id: 'Modal',
    imports: ["import { Modal } from '@toptal/picasso'"],
    example: figma.code`<Modal open size='xsmall' onClose={() => { }}>
      Modal content
    </Modal>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Size') === 'sm') {
  template = {
    id: 'Modal',
    imports: ["import { Modal } from '@toptal/picasso'"],
    example: figma.code`<Modal open size='small' onClose={() => { }}>
      Modal content
    </Modal>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Size') === 'md') {
  template = {
    id: 'Modal',
    imports: ["import { Modal } from '@toptal/picasso'"],
    example: figma.code`<Modal open size='medium' onClose={() => { }}>
      Modal content
    </Modal>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Size') === 'lg') {
  template = {
    id: 'Modal',
    imports: ["import { Modal } from '@toptal/picasso'"],
    example: figma.code`<Modal open size='large' onClose={() => { }}>
      Modal content
    </Modal>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Size') === 'xl') {
  template = {
    id: 'Modal',
    imports: ["import { Modal } from '@toptal/picasso'"],
    example: figma.code`<Modal open size='xlarge' onClose={() => { }}>
      Modal content
    </Modal>`,
  }
} else {
  template = {
    id: 'Modal',
    imports: ["import { Modal } from '@toptal/picasso'"],
    example: figma.code`<Modal open size='xlarge' onClose={() => { }}>
      Modal content
    </Modal>`,
  }
}

export default template
