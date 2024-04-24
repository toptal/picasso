import type { ReactElement } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
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
  const { icon, onClick, active, className, style, disabled, ...rest } = props

  return (
    <ButtonCircular
      variant='flat'
      onClick={onClick}
      icon={icon}
      style={style}
      className={twMerge(
        'rounded-sm [&:not(:first-of-type)]:ml-2',
        active && 'bg-graphite-700 [&:not(:hover)_svg]:fill-white',
        className
      )}
      disabled={disabled}
      {...rest}
    />
  )
}

RichTextEditorButton.defaultProps = {
  active: false,
  disabled: false,
  onClick: () => {},
}

RichTextEditorButton.displayName = 'RichTextEditorButton'

export default RichTextEditorButton
