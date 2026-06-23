import figma from '@figma/code-connect'
import { Slider } from '@toptal/picasso'

figma.connect(
  Slider,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=338-13828',
  {
    example: () => <Slider onChange={() => {}} />,
  }
)

figma.connect(
  Slider,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=339-14167',
  {
    example: () => <Slider value={[20, 80]} onChange={() => {}} tooltip='on' />,
  }
)
