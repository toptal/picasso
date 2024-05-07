import type {
  ReactNode,
  ReactElement,
  ElementType,
  MouseEvent,
  ReactEventHandler,
} from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { toTitleCase } from '@toptal/picasso-utils'
import { twMerge } from 'tailwind-merge'

import { variantsRootClasses } from './styles'

export type Variant = 'light-grey' | 'blue' | 'green' | 'yellow' | 'red'

interface RootRest extends BaseProps {
  ['aria-disabled']?: boolean
  role?: string
}

export interface Props extends BaseProps, TextLabelProps {
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
  /** Text content of the `Tag` component */
  children: ReactNode
  /** Specify the icon which should be rendered inside Tag */
  icon?: ReactElement
  /** Defines if `Tag` is disabled */
  disabled?: boolean
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Tag`
   */
  onDelete?: ReactEventHandler
  onClick?: ReactEventHandler
  /** Variant of the `Tag` */
  variant?: Variant
  /** ReactNode rendered after label */
  endAdornment?: ReactNode
}

// eslint-disable-next-line react/display-name
export const Tag = forwardRef<HTMLDivElement, Props>(function Tag(props, ref) {
  const {
    as: Root = 'div',
    className,
    disabled,
    endAdornment,
    children,
    icon: propIcon,
    onDelete,
    onClick,
    style,
    titleCase: propsTitleCase,
    variant = 'light-grey',
    ...rest
  } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const titleCase = useTitleCase(propsTitleCase)

  const rootRest: RootRest = { ...rest }

  if (onDelete || onClick) {
    rootRest.role = 'button'
  }

  if (disabled) {
    rootRest['aria-disabled'] = true
  }

  const handleDelete = (event: MouseEvent) => {
    if (disabled) {
      return
    }

    if (onDelete) {
      event.preventDefault()

      // event.stopPropagation()

      onDelete(event)
    }
  }

  return (
    <Root
      {...rootRest}
      ref={ref}
      className={twMerge(
        `transition-none text-lg border-[0.041625rem] border-solid rounded-[6.25rem]
          h-6 max-w-full inline-flex justify-center items-center cursor-default bg-white
          group align-middle`,
        variantsRootClasses[variant],
        className,
        disabled ? 'text-gray-500 border-gray-200 pointer-events-none' : ''
      )}
      style={style}
      onClick={onClick}
    >
      {propIcon ? (
        <span className='w-min h-min flex items-center mr-[-0.25rem] ml-3'>
          {React.cloneElement(propIcon, {
            color: disabled ? 'grey' : 'dark-grey',
          })}
        </span>
      ) : undefined}

      <span className='flex gap-2 px-3 overflow-hidden'>
        <span className='text-xxs min-w-0 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {titleCase ? toTitleCase(children) : children}
        </span>

        {endAdornment}
      </span>

      {onDelete && (
        <span
          aria-label='delete icon'
          role='button'
          className='w-min h-min flex items-center cursor-pointer ml-[-0.5rem] mr-2'
          onClick={handleDelete}
        >
          <CloseMinor16 />
        </span>
      )}
    </Root>
  )
})

Tag.defaultProps = {
  as: 'div',
  children: '',
  variant: 'light-grey',
}

Tag.displayName = 'Tag'

export default Tag
