/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import ButtonCircular from '@toptal/picasso-button-circular'
import Dropdown from '@toptal/picasso-dropdown'
import { Close24, Overview24 } from '@toptal/picasso-icon'

import { useHamburgerContext } from './PageHamburgerContext'
import styles from './styles'

interface Props {
  id: string
  'data-testid'?: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PageHamburger',
})

const PageHamburger = ({ id, 'data-testid': dataTestId }: Props) => {
  const { showSidebarMenu, hamburgerRef } = useHamburgerContext()
  const [showContent, setShowContent] = useState<boolean>(false)
  const classes = useStyles()

  const handleShowContent = () => setShowContent(true)
  const handleHideContent = () => setShowContent(false)

  return (
    <Dropdown
      content={<div id={id} ref={hamburgerRef} />}
      className={cx(classes.root, {
        [classes.hidden]: !showSidebarMenu,
      })}
      classes={{
        content: classes.responsiveWrapperContent,
        popper: classes.popper,
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
            <Overview24 className={classes.hamburger} />
          )
        }
        data-testid={dataTestId}
        variant='transparent'
      />
    </Dropdown>
  )
}

export default PageHamburger
