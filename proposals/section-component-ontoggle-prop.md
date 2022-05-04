# Description

A new prop for the `Section` component that accepts a callback to run when the section is toggled (if section is `collapsible`)

# Use case

The section `title` turns into a link when the section is open

# Example modifications in Section.tsx

```jsx
(...)
export interface Props extends BaseProps {
  (...)
  onToggle?: (toggled: boolean) => void // Added
}
(...)
export const Section = ((...) props, ref ) {
  const {
(...)
    onToggle, // Added
    ...rest
  } = props
(...)
  const toggleCollapse = () => {
    onToggle?.(!collapsed) // Added
    setCollapsed(!collapsed)
  }
(...)
```

## Example usage

```jsx
import React, { useState } from 'react'
import { Link, Section } from '@toptal/picasso'

const ExampleComponent = () => {
  const [collapsed, setCollapsed] = useState(false)
  const title = collapsed ? 'Toptal' : <Link href='https://toptal.com'>Toptal</Link>

  return (
    <Section collapsible onToggle={setCollapsed} title={title}>
      Foo Bar
    </Section>
  )
}
```
