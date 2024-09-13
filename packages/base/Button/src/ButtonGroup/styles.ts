export const createRootClassNames = () => {
  const classNames: string[] = [
    'flex',
    'justify-start',

    '[&>[data-component-type="button"]:hover]:z-[1]',

    '[&>[data-component-type="button"]:first-child:not(:last-child)]:rounded-r-none',
    '[&>[data-component-type="button"]:first-child:not(:last-child)]:ml-0',

    '[&>[data-component-type="button"]:not(:first-child):not(:last-child)]:rounded-none',
    '[&>[data-component-type="button"]:not(:first-child):not(:last-child)]:ml-[-1px]',

    '[&>[data-component-type="button"]:last-child:not(:first-child)]:rounded-l-none',
    '[&>[data-component-type="button"]:last-child:not(:first-child)]:ml-[-1px]',

    // nested buttons
    '[&_:first-child:not(:last-child)_[data-component-type="button"]]:rounded-r-none',
    '[&_:first-child:not(:last-child)_[data-component-type="button"]]:ml-0',

    '[&_:not(:first-child):not(:last-child)_[data-component-type="button"]]:rounded-none',
    '[&_:not(:first-child):not(:last-child)_[data-component-type="button"]]:ml-[-1px]',

    '[&_:last-child:not(:first-child)_[data-component-type="button"]]:rounded-l-none',
    '[&_:last-child:not(:first-child)_[data-component-type="button"]]:ml-[-1px]',
  ]

  return classNames
}
