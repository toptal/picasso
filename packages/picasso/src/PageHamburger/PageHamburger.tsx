import React, { useState } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import ButtonCircular from '../ButtonCircular'
import { useHamburgerContext } from './PageHamburgerContext'
import Dropdown from '../Dropdown'
import { Close24, Overview24 } from '../Icon'
import { useBreakpoint } from '../utils'
import styles from './styles'

interface Props {
  id: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PageHamburger',
})

const PageHamburger = ({ id }: Props) => {
  const { isHamburgerVisible } = useHamburgerContext()
  const [showContent, setShowContent] = useState<boolean>(false)
  const classes = useStyles()
  const isCompactLayout = useBreakpoint(['xs', 'sm', 'md', 'lg'])

  const handleShowContent = () => setShowContent(true)
  const handleHideContent = () => setShowContent(false)

  return (
    <Dropdown
      content={<div id={id} />}
      className={cx({
        [classes.hidden]: !isCompactLayout || !isHamburgerVisible,
      })}
      classes={{ content: classes.responsiveWrapperContent }}
      offset={{ top: 0.4 }}
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
        variant='transparent'
      />
    </Dropdown>
  )
}

export default PageHamburger
