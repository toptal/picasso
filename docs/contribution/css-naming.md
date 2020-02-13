# CSS naming
To maintain consistency within `Picasso` repository we try to follow some conventions when overriding MUI components with own classes map.

### Main `root` property of stylesheet
* The main `class` of all components is taken from convention introduced by MUI therefore `root`. You should always use `root` className for the topmost parent element. 

* If you need to have multiple `root` classes based on some property, for example for property `width={full | shrink}` where you need to adjust root wrapper, you should create the following keys in styles:

* `root` - This will be applied every time to component
* `rootFull` - This will be applied when `width === ‘full'`
* `rootShrink` - This will be applied when `width === ‘shrink’`

**Container.tsx**
```jsx
import React from 'react'
import cx from 'classnames'
import capitalize from '@material-ui/core/utils/capitalize'

import styles from './styles'

const Container = ({ classes, width, children }) => {
  const rootClassname = cx(classes.root, classes[`root${capitalize(width)}`])

  return (
    <div className={rootClassname}>
      {children}
    </div>
  )
}

export default withStyles(styles)(Hero)

```

### Boolean properties
Common pattern in components is to shorthand useful classes to short syntax such as `active` `focused` `disabled` properties. 

We use same class key as property name without any prefixes/suffixes when only one variant is needed. 

```jsx
import { createStyles } from '@material-ui/core/styles'

export default createStyles({
  active: {
    background: 'blue'
  },
  focused: {
    background: 'red'
  },
  disabled: {
    opacity: 0.2,
    pointerEvents: 'none'
  }
})
```

To compose component with usage of those classes we will again use `classnames` package. 

**Button.tsx**
```jsx
import React from 'react'
import cx from 'classnames'

import styles from './styles'

const Button = ({ classes, active, focused, disabled }) => {
  const rootClassName = cx(
    {
      [classes.active]: active,
      [classes.focused]: focused,
      [classes.disabled]: disabled
    },
    classes.root
  )
  return (
    <Button classes={{
      root: rootClassName
    }} />
  )
}

export default withStyles(styles)(Button)

```
