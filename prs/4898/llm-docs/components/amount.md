# Amount

Use "Amount" to render formatted amount with a currency, in desired locale.

## Props

### Amount

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **amount** | `string \| number` | - | The amount to be formatted |
| currency | `string` | `USD` | Currency which need to be applied on the amount (ISO format) https://www.currency-iso.org/en/home/tables/table-a1.html |
| locale | `string` | `en-US` | Locale identifiers are case-insensitive ASCII. However, it's conventional to use title case (first letter capitalized, successive letters lower case) for script code, upper case for region codes, and lower case for everything else. |
| minimumFractionDigits | `number` | - | The minimum number of fraction digits to display |
| maximumFractionDigits | `number` | - | The maximum number of fraction digits to display |
| variant | `"body" \| "heading"` | - | Font variant for inner text |
| children | `ReactNode` | - | Text content |
| inline | `boolean` | `true` | Controls whether the Typography is inline or not |
| align | `"inherit" \| "left" \| "center" \| "right" \| "justify"` | - | Text align of the inner text |
| size | `"small" \| "inherit" \| "xxsmall" \| "xsmall" \| "medium" \| "large" \| "xlarge"` | - | Size of the inner text |
| weight | `"inherit" \| "regular" \| "semibold"` | - | Font weight of the inner text |
| invert | `boolean` | - | Invert color |
| color | `"inherit" \| "green" \| "red" \| "yellow" \| "light-grey" \| "grey" \| "grey-main-2" \| "dark-grey" \| "black" \| "light-blue"` | - | Text color |
| noWrap | `boolean` | - | Enable ellipsis for overflowing text |
| as | `ElementType<HTMLAttributes<HTMLElement>>` | `span` | Rendered HTML markup |
| underline | `"solid" \| "dashed"` | - | Controls when the Typography should have an underline |
| lineThrough | `boolean` | - | Controls when the Typography should have line through |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import { Amount, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} color='green' weight='semibold' size='medium' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={150} color='grey' size='xsmall' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={15} inline={false} />
    </Container>
  </div>
)

export default Example
```

### Currency Variants

```tsx
import { Amount, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} currency='EUR' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={150} currency='USD' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={15} currency='HUF' />
    </Container>
  </div>
)

export default Example
```

### Typography Variants

```tsx
import { Amount, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} color='red' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} color='green' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={150} weight='semibold' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={15} size='large' />
    </Container>
  </div>
)

export default Example
```

### Locale Variants

```tsx
import { Amount, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using default (en-US) locale
      </Typography>
      <Amount amount={15} />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using French locale
      </Typography>
      <Amount amount={1500} locale='fr-FR' />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using Hungarian locale
      </Typography>
      <Amount amount={150} locale='hu-HU' />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using Austrian locale
      </Typography>
      <Amount amount={15} locale='de-AT' />
    </Container>
  </div>
)

export default Example
```

### Fractional digits

```tsx
import { Amount, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        minimumFractionDigits: 5
      </Typography>
      <Amount amount={1234.67} minimumFractionDigits={5} />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        maximumFractionDigits: 1
      </Typography>
      <Amount amount={1234.67} maximumFractionDigits={1} />
    </Container>
  </div>
)

export default Example
```
