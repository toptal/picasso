import React from 'react'
import type { ReactNode } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { ArrowLongRight16, Check16 } from '@toptal/picasso-icons'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { ListItemType } from '../List'
import { useListContext } from '../List'
import { listStyleTypeClass } from '../List/styles'
import type { Variant } from '../List/types'

const resolveIcon = (type: ListItemType | undefined) => {
  switch (type) {
    case 'checkmark':
      return <Check16 />
    case 'arrow':
      return <ArrowLongRight16 />
    default:
      return undefined
  }
}

export type Props = BaseProps & {
  children: ReactNode
  index?: number
  variant?: Variant
  /** Style of the bullet/ordinal */
  type?: ListItemType
  isLastElement?: boolean
}

export const ListItem = (props: Props) => {
  const { styleType: parentType } = useListContext()
  const { children, type, 'data-testid': testId } = props

  const icon = resolveIcon(type ?? parentType)

  return (
    <li
      className={twJoin(
        icon && 'list-none -ml-[1.375rem]',
        type && listStyleTypeClass[type]
      )}
      data-testid={testId}
    >
      <Container flex direction='row' className='mt-1'>
        {icon && (
          <Container inline justifyContent='flex-end'>
            {icon}
          </Container>
        )}
        <Typography as='div' size='medium' className='pl-2'>
          {children}
        </Typography>
      </Container>
    </li>
  )
}

ListItem.displayName = 'ListItem'

export default ListItem
