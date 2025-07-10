import type { ReactElement } from 'react'
import React from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps } from '@toptal/picasso-shared'
import { ButtonCircular } from '@toptal/picasso-button'

type Props = BaseProps & {
  active: boolean
  disabled: boolean
  icon: ReactElement
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  id?: string
}

const RichTextEditorButton = (props: Props) => {
  const {
    icon,
    onClick = () => {},
    active = false,
    className,
    style,
    disabled = false,
    ...rest
  } = props

  return (
    <ButtonCircular
      variant='flat'
      onClick={onClick}
      icon={icon}
      style={style}
      className={twMerge(
        'rounded-sm [&+&]:!ml-2',
        active && 'bg-graphite-700 [&:not(:hover)_svg]:fill-white',
        className
      )}
      disabled={disabled}
      {...rest}
    />
  )
}

RichTextEditorButton.displayName = 'RichTextEditorButton'

export default RichTextEditorButton
