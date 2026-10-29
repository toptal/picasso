import React, { useState } from 'react'
import { ButtonCircular } from '@toptal/picasso-button'
import { Dropdown } from '@toptal/picasso-dropdown'
import { Close24, Overview24 } from '@toptal/picasso-icons'
import type { BaseProps } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props extends BaseProps {
  id: string
  /** Color variant of the top bar the hamburger is rendered on */
  variant?: 'dark' | 'light'
}

const PageHamburger = ({
  id,
  variant = 'dark',
  className,
  style,
  'data-testid': dataTestId,
}: Props): React.ReactElement => {
  const { hamburgerRef } = useHamburgerContext()
  const [showContent, setShowContent] = useState<boolean>(false)

  const handleShowContent = () => setShowContent(true)
  const handleHideContent = () => setShowContent(false)

  return (
    <Dropdown
      className={className}
      style={style}
      content={<div id={id} ref={hamburgerRef} />}
      classes={{
        content: `!shadow-[inset_-1px_0px_0px_0px] !shadow-gray-200 max-h-[calc(100vh-var(--header-height,3.5rem))] !bg-gray-100`,
        popper: '[&]:mt-4',
      }}
      // The "disablePortal" is needed for testing the dropdown hamburger menu in Cypress.
      // Without it, React fails to create portal inside of portal (via `createPortal()`), so
      // the problem needs to be further debugged on React code level.
      disablePortal
      popperOptions={{
        modifiers: {
          flip: { enabled: false },
          preventOverflow: {
            padding: 0,
          },
        },
      }}
      popperProps={{
        role: 'navigation',
      }}
      onOpen={handleShowContent}
      onClose={handleHideContent}
      keepMounted
    >
      <ButtonCircular
        icon={
          showContent ? (
            <Close24 />
          ) : (
            <Overview24 className='pointer-events-none' />
          )
        }
        data-testid={dataTestId}
        variant={variant === 'light' ? 'flat' : 'transparent'}
        // Room around the 24px icon without moving it, until xl shrinks it
        responsive
        className='-m-2 xl:m-0 rounded-sm'
      />
    </Dropdown>
  )
}

export default PageHamburger
