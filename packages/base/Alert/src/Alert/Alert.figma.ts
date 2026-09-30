// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=13667-16196
// source=https://github.com/toptal/picasso/blob/master/packages/base/Alert/src/AlertCompound/index.ts
// component=Alert

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (
  figma.selectedInstance.getPropertyValue('CTA Primary') === false &&
  figma.selectedInstance.getPropertyValue('CTA Secondary') === false
) {
  const variant = figma.selectedInstance.getEnum('Color', {
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
  })
  const onClose = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.function('() => {}'),
    false: undefined,
  })

  template = {
    id: 'Alert',
    imports: ["import { Alert } from '@toptal/picasso'"],
    example: figma.code`<Alert${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp('onClose', onClose)}>
      Alert message
    </Alert>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('CTA Primary') === true &&
  figma.selectedInstance.getPropertyValue('CTA Secondary') === false
) {
  const variant = figma.selectedInstance.getEnum('Color', {
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
  })
  const onClose = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.function('() => {}'),
    false: undefined,
  })

  template = {
    id: 'Alert',
    imports: ["import { Alert } from '@toptal/picasso'"],
    example: figma.code`<Alert${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'onClose',
      onClose
    )} actions={{ primary: { label: 'Primary Action', onClick: () => { } } }}>
      Alert message
    </Alert>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('CTA Primary') === false &&
  figma.selectedInstance.getPropertyValue('CTA Secondary') === true
) {
  const variant = figma.selectedInstance.getEnum('Color', {
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
  })
  const onClose = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.function('() => {}'),
    false: undefined,
  })

  template = {
    id: 'Alert',
    imports: ["import { Alert } from '@toptal/picasso'"],
    example: figma.code`<Alert${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'onClose',
      onClose
    )} actions={{ secondary: { label: 'Secondary Action', onClick: () => { } } }}>
      Alert message
    </Alert>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('CTA Primary') === true &&
  figma.selectedInstance.getPropertyValue('CTA Secondary') === true
) {
  const variant = figma.selectedInstance.getEnum('Color', {
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
  })
  const onClose = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.function('() => {}'),
    false: undefined,
  })

  template = {
    id: 'Alert',
    imports: ["import { Alert } from '@toptal/picasso'"],
    example: figma.code`<Alert${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp('onClose', onClose)} actions={{
        primary: { label: 'Primary Action', onClick: () => { } },
        secondary: { label: 'Secondary Action', onClick: () => { } },
    }}>
      Alert message
    </Alert>`,
    metadata: { nestable: true },
  }
} else {
  const variant = figma.selectedInstance.getEnum('Color', {
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
  })
  const onClose = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.function('() => {}'),
    false: undefined,
  })

  template = {
    id: 'Alert',
    imports: ["import { Alert } from '@toptal/picasso'"],
    example: figma.code`<Alert${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp('onClose', onClose)} actions={{
        primary: { label: 'Primary Action', onClick: () => { } },
        secondary: { label: 'Secondary Action', onClick: () => { } },
    }}>
      Alert message
    </Alert>`,
    metadata: { nestable: true },
  }
}

export default template
