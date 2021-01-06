# JSS Onboarding

To not introduce new styling system on the top of what Material-UI provides in the core, we stuck to [JSS](https://cssinjs.org/?v=v10.0.0-alpha.16) which is used internally in all MUI components. More on official documentation can be found at [CSS in JS - Material-UI](https://material-ui.com/customization/css-in-js/)

## How JSS works

JSS under the cover is a very simple `object -> classMap` engine which picks rules specified in output and creates resulting `className` map.

Example of input object:

```jsx
{
  root: {
    color: 'red'
  }
}
```

Output:

```jsx
{
  root: 'jss-[randHash]'
}
```

JSS will inject those classes to `<head></head>` section of page so they can be referenced later inside components.

## Customizing MUI components with JSS

Every MUI component has specific JSS classes map which could be overridden from the top. Usually, all components have the `root` key which is style applied to the very top parent node.

Every component has those available listed keys in the bottom of the docs [Button API - Material-UI](https://material-ui.com/api/button/#css) where you can see which keys are support and picked from the `classes` property on **EVERY** component. This behavior is global and applied to all core components.

The easiest example for a button could be found at [Overriding styles - Material-UI](https://material-ui.com/styles/advanced/#overriding-styles-classes-prop) which shows how you can override default styles with a React hook.

## Adding additional classes to our components

Often default supported `classes` are not enough and we need to extend for example `root` class conditionally for example in case of `Button` variant. Let's imagine we want to provide a color based on the property `variant` passed to our component. We can do it for example by extending `root` class with default `classes` property passed to every MUI component. To achieve this we have to override default classes property passed to our component. With this approach we will conditionally attach generate classes for either `.root .red` or `.root .green` based on `variant` prop.

We can create 2 new variants to our button `green` and `red` and define it’s CSS inside `styles.ts` file aside to root file of our component.

**styles.ts**

```jsx
import { createStyles } from '@material-ui/core/styles'

export default createStyles({
  root: { border: 'none' },
  green: { color: 'green' },
  red: { color: 'red' }
})
```

**Button.tsx**

```jsx
import React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Button = (props) => {
  const classes = useStyles()

  const { variant } = props

  return (
    <Button
      classes={{
        root: cx(classes.root, classes[variant])
      }}
    />
  )
}

export default Button
```

With this approach we will conditionally attach generate classes for either `.root .red` or `.root .green` based on `variant` prop.

## Targeting nested rules within JSS stylesheets

There are cases where you need to target and override some classes within the same stylesheets. For example, if you have some div and text inside it, if you want to apply a different color to text inside with CSS is easy as you can target `.main .text` rule, but as JSS is just hash map you can’t target such cases with the same way. In order to solve this problem, JSS introduced [jss-nested](https://cssinjs.org/jss-plugin-nested) plugin which allows you to target specific class.

**styles.ts**

```jsx
import { createStyles } from '@material-ui/core/styles'

export default createStyles({
  root: {
    fontSize: '12px'
  },
  big: {
    '& $title': {
      fontSize: '24px'
    }
  },
  title: { color: 'green' }
})
```

You can notice `& $title` notation which simply means: “Target this.title rule”. Then as in the previous example, you can just compose `root` rule.

**Hero.tsx**

```jsx
import React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Hero = (props) => {
  const classes = useStyles()

  const { variant } = props

  return (
    <div className={cx(classes.root, classes[variant])}>
      <h1 className={classes.title}>Title</h1>
      <span>Content</span>
    </div>
  )
}

export default Hero
```

In this way, you will affect only `<h1>` element and its font size, not all children in the tree.
