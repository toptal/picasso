import React, { useState, useEffect } from 'react'
// we could use Page.Head instead, but it required PicassoProvider to be initialized
// so it led to cross dependencies and error
import { Helmet } from 'react-helmet'

import { EnvironmentType } from './types'
import { getIcons } from './icons'

export interface Props {
  /** Choose an icon color based on this variable */
  environment?: EnvironmentType
}

export const Favicon = ({ environment }: Props) => {
  const [icons, setIcons] = useState<{
    icon16?: string
    icon32?: string
    icon180?: string
  }>({})

  useEffect(() => {
    async function loadIcons() {
      try {
        const icons = await getIcons(environment!)

        setIcons(icons)
      } catch {
        // eslint-disable-next-line no-console
        console.error(
          'favicons were not loaded properly for environment ',
          environment
        )
      }
    }

    loadIcons()
  }, [])

  const { icon16, icon32, icon180 } = icons

  // favicon.ico will be loaded automatically by browser from "public" folder
  // if it exists there. It's needed only for old browsers
  // we don't have to specify it in the head
  return (
    <Helmet>
      <link rel='apple-touch-icon' sizes='180x180' href={icon180} />
      <link rel='icon' type='image/png' sizes='32x32' href={icon32} />
      <link rel='icon' type='image/png' sizes='16x16' href={icon16} />
    </Helmet>
  )
}

Favicon.defaultProps = {
  environment: 'development'
}

Favicon.displayName = 'Favicon'

export default Favicon
