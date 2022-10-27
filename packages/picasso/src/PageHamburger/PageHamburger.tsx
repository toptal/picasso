import React, { useContext, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import ButtonCircular from '../ButtonCircular'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import Dropdown from '../Dropdown'
import { Close16, Overview16 } from '../Icon'
import { useBreakpoint } from '../utils'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PageHamburger',
})

const PageHamburgerContent = () => {
  return <div id='hamburger' />
}

const PageHamburger = () => {
  const { showHamburger } = useContext<PageContextProps>(PageContext)
  const [showContent, setShowContent] = useState<boolean>(false)
  const classes = useStyles()
  const isCompactLayout = useBreakpoint(['small', 'medium'])

  const handleShowContent = () => setShowContent(true)
  const handleHideContent = () => setShowContent(false)

  return (
    <Dropdown
      content={<PageHamburgerContent />}
      className={cx(classes.responsiveWrapper, {
        [classes.hidden]: !isCompactLayout || !showHamburger,
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
      onOpen={handleShowContent}
      onClose={handleHideContent}
      keepMounted
    >
      <ButtonCircular
        icon={
          showContent ? (
            <Close16 />
          ) : (
            <Overview16 style={{ pointerEvents: 'none' }} />
          )
        }
        variant='transparent'
      />
    </Dropdown>
  )
}

export default PageHamburger
