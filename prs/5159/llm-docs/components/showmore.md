# ShowMore

Strips provided content.

## Props

### ShowMore

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Content of the component |
| rows | `number` | - | Number of lines displayed initially |
| moreText | `string` | - | Text used by action link showing whole content |
| lessText | `string` | - | Text used by action link hiding whole content |
| initialExpanded | `boolean` | - | Define component initial state, whether it should be collapsed or not |
| disableToggle | `boolean` | - | Define whether action link should be displayed or not |
| onToggle | `((nextState: boolean) => void)` | - | Callback triggered when show more/less is clicked |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '430px' }}>
    <ShowMore>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
      quam odit omnis quod in voluptates est doloremque nulla sequi, illum
      deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Eos earum vitae quam odit omnis
      quod in voluptates est doloremque nulla sequi, illum deleniti, beatae quo?
      Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
      doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
      omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
      earum vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
      illum deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
      omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
      beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
      voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
      similique nemo omnis quasi?
    </ShowMore>
  </div>
)

export default Example
```

### Line Breaks

```tsx
import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => {
  const text =
    'Lorem ipsum \r\n\r\ndolor sit amet\r\n\r\nconsectetur adipisicing elit.\r\n\r\nEos earum vitae\r\n\r\nquam odit omnis quod in voluptates est doloremque nulla sequi,\r\n\r\nillum deleniti, beatae quo?'

  return <ShowMore>{text}</ShowMore>
}

export default Example
```

### Expanded

```tsx
import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '430px' }}>
    <ShowMore initialExpanded>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
      quam odit omnis quod in voluptates est doloremque nulla sequi, illum
      deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Eos earum vitae quam odit omnis
      quod in voluptates est doloremque nulla sequi, illum deleniti, beatae quo?
      Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
      doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
      omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
      earum vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
      illum deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
      omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
      beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
      voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
      similique nemo omnis quasi?
    </ShowMore>
  </div>
)

export default Example
```

### Custom Limit

```tsx
import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '430px' }}>
    <ShowMore rows={2}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
      quam odit omnis quod in voluptates est doloremque nulla sequi, illum
      deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Eos earum vitae quam odit omnis
      quod in voluptates est doloremque nulla sequi, illum deleniti, beatae quo?
      Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
      doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
      omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
      earum vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
      illum deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
      omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
      beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
      voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
      similique nemo omnis quasi?
    </ShowMore>
  </div>
)

export default Example
```

### Toggle Disabled

```tsx
import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '430px' }}>
    <ShowMore disableToggle>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
      quam odit omnis quod in voluptates est doloremque nulla sequi, illum
      deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Eos earum vitae quam odit omnis
      quod in voluptates est doloremque nulla sequi, illum deleniti, beatae quo?
      Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
      doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
      omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
      earum vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
      illum deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
      omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
      beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
      voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
      similique nemo omnis quasi?
    </ShowMore>
  </div>
)

export default Example
```

### With zero rows

```tsx
import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '430px' }}>
    <ShowMore rows={0}>
      Lorem ipsum elit. Eos earum vitae quam odit omnis quod in voluptates est
      doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
      omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
      earum vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
      illum deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
      omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
      beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
      voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
      similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
      doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
      omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
      earum vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
      illum deleniti, beatae quo? Eaque similique nemo omnis quasi?
    </ShowMore>
  </div>
)

export default Example
```

### With React children

```tsx
import React from 'react'
import { ShowMore, Link } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '430px' }}>
    <ShowMore>
      <Link href='#'>Lorem ipsum</Link> elit. <strong>Eos earum</strong> vitae
      quam odit omnis quod in voluptates est doloremque nulla sequi, illum
      deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Eos earum vitae quam odit omnis
      quod in voluptates est doloremque nulla sequi, illum deleniti, beatae quo?
      Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
      doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
      omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
      earum vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
      illum deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
      omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
      beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
      voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
      similique nemo omnis quasi?
    </ShowMore>
  </div>
)

export default Example
```

### With onToggle callback

```tsx
import React, { useState } from 'react'
import { ShowMore, Tag } from '@toptal/picasso'

const Example = () => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <div style={{ width: '430px' }}>
      {isExpanded ? (
        <Tag variant='green'>expanded</Tag>
      ) : (
        <Tag variant='red'>closed</Tag>
      )}

      <ShowMore onToggle={setExpanded}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
        quam odit omnis quod in voluptates est doloremque nulla sequi, illum
        deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
        omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
        beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
        voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
        similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
        doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
        omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Eos earum vitae quam odit omnis quod in voluptates est doloremque nulla
        sequi, illum deleniti, beatae quo? Eaque similique nemo omnis quasi?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
        quam odit omnis quod in voluptates est doloremque nulla sequi, illum
        deleniti, beatae quo? Eaque similique nemo omnis quasi?
      </ShowMore>
    </div>
  )
}

export default Example
```

### With short text

If number of lines are less than `rows` defined, the "Show More" button is hidden

```tsx
import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '430px' }}>
    <ShowMore rows={3}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
      quam odit omnis quod in voluptates est doloremque nulla sequi, illum
    </ShowMore>
  </div>
)

export default Example
```
