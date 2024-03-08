import cx from 'classnames'
import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
/*
What props are used:

elevation (used values 0, 1, 2, 3, 6, 15)

---

MUI root style
{
  color: unset;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
}

MUI elevation for Paper
{
  "elevation0": {
    "boxShadow": "none"
  },
  "elevation1": {
    "boxShadow": "0 0 8px 0 rgba(0,0,0, 0.08)"
  },
  "elevation2": {
    "boxShadow": "0 4px 8px 0 rgba(0,0,0, 0.08)"
  },
  "elevation3": {
    "boxShadow": "0 0 0 1px rgba(0, 0, 0, 0.04), 0 0 8px 0 rgba(0, 0, 0, 0.16)"
  },
  "elevation4": {
    "boxShadow": "0 0 4px 0 rgba(0,0,0, 0.24), 0 0 32px 0 rgba(0,0,0, 0.12)"
  },
  "elevation5": {
    "boxShadow": "0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 12px -3px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04)"
  },
  "elevation6": {
    "boxShadow": "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"
  },
  "elevation7": {
    "boxShadow": "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)"
  },
  "elevation8": {
    "boxShadow": "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)"
  },
  "elevation9": {
    "boxShadow": "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)"
  },
  "elevation10": {
    "boxShadow": "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)"
  },
  "elevation11": {
    "boxShadow": "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)"
  },
  "elevation12": {
    "boxShadow": "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)"
  },
  "elevation13": {
    "boxShadow": "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)"
  },
  "elevation14": {
    "boxShadow": "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)"
  },
  "elevation15": {
    "boxShadow": "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)"
  },
  "elevation16": {
    "boxShadow": "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)"
  },
  "elevation17": {
    "boxShadow": "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)"
  },
  "elevation18": {
    "boxShadow": "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)"
  },
  "elevation19": {
    "boxShadow": "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)"
  },
  "elevation20": {
    "boxShadow": "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)"
  },
  "elevation21": {
    "boxShadow": "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)"
  },
  "elevation22": {
    "boxShadow": "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)"
  },
  "elevation23": {
    "boxShadow": "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)"
  },
  "elevation24": {
    "boxShadow": "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  }
}

data-testid
data-content
className
style
ref
onClick
onKeyDown
key
css

+ default behavior
*/

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of component */
  elevation?: number
  children: ReactNode
}

export const Paper = forwardRef<HTMLDivElement, Props>(function Paper(
  props,
  ref
) {
  const {
    className,
    style,
    elevation,
    children,
    'data-testid': dataTestId,
    ...rest
  } = props

  console.log('@@@ here')

  return (
    <div
      ref={ref}
      className={cx(
        className,
        'bg-white',
        // same as default MUI Paper elevation=1 (boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.08)')
        'shadow-1'
      )}
      style={style}
      data-testid={dataTestId}
      {...rest}
    >{children}</div>
  )
})

Paper.defaultProps = {
  elevation: 1,
}

Paper.displayName = 'Paper'

export default Paper
