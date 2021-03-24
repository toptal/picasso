import React, { useEffect } from 'react'
// we could use Page.Head instead, but it required PicassoProvider to be initialized
// so it led to cross dependencies and error
import { Helmet } from 'react-helmet'
import useSafeState from '@toptal/picasso/utils/use-safe-state'
import { unsafeErrorLog } from '@toptal/picasso/utils'

import { getIcons } from './icons'
import { useAppConfig, EnvironmentType } from '../Picasso'

export interface Props {
  /** Choose an icon color based on this variable */
  environment?: EnvironmentType<'test' | 'temploy'>
}

export const Favicon = ({ environment }: Props) => {
  const [icons, setIcons] = useSafeState<{
    icon16?: string
    icon32?: string
    icon180?: string
  }>({})

  const { environment: configEnvironment } = useAppConfig()

  const resolvedEnvironment = environment || configEnvironment

  useEffect(() => {
    if (resolvedEnvironment === 'test') {
      return
    }

    const loadIcons = async () => {
      try {
        const loadedIcons = await getIcons(
          resolvedEnvironment as EnvironmentType
        )

        setIcons(loadedIcons)
      } catch {
        // eslint-disable-next-line no-console
        unsafeErrorLog(
          'favicons were not loaded properly for environment',
          resolvedEnvironment
        )
      }
    }

    loadIcons()
  }, [resolvedEnvironment])

  if (resolvedEnvironment === 'test') {
    // do not load favicons in tests (e.g. in e2e)
    return null
  }

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

Favicon.defaultProps = {}

Favicon.displayName = 'Favicon'

export default Favicon
