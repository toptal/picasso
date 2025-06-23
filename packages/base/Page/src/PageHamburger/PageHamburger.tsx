import React, { useState } from 'react'
import { ButtonCircular } from '@toptal/picasso-button'
import { Dropdown } from '@toptal/picasso-dropdown'
import { Close24, Overview24 } from '@toptal/picasso-icons'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  id: string
  'data-testid'?: string
}

const PageHamburger = ({ id, 'data-testid': dataTestId }: Props) => {
  const { hamburgerRef } = useHamburgerContext()
  const [showContent, setShowContent] = useState<boolean>(false)

  const handleShowContent = () => setShowContent(true)
  const handleHideContent = () => setShowContent(false)

  return (
    <Dropdown
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
        variant='transparent'
      />
    </Dropdown>
  )
}

export default PageHamburger
