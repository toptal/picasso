import React from 'react'
// we could use Page.Head instead, but it required PicassoProvider to be initialized
// so it led to cross dependencies and error
import { Helmet } from 'react-helmet'

type EnvironmentType = 'development' | 'staging' | 'temploy' | 'production'

export interface Props {
  /** Specify location of the icons */
  path?: string
  /** Choose an icon color based on this variable */
  environment?: EnvironmentType
}

const getIconPostfix = (environment: EnvironmentType) => {
  return environment !== 'development' ? `-${environment}` : ''
}

export const Favicon = ({ path, environment }: Props) => {
  const postfix = getIconPostfix(environment!)
  const getPath = (filename: string) => {
    const dotIndex = filename.lastIndexOf('.')
    const srcWithPostfix =
      filename.slice(0, dotIndex) + postfix + filename.slice(dotIndex)

    return path + srcWithPostfix
  }

  // favicon.ico will be loaded automatically by browser,
  // we don't need to specify it in the head
  return (
    <Helmet>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href={getPath('apple-touch-icon.png')}
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href={getPath('favicon-32x32.png')}
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href={getPath('favicon-16x16.png')}
      />
    </Helmet>
  )
}

Favicon.defaultProps = {
  path: '/',
  environment: 'development'
}

Favicon.displayName = 'Favicon'

export default Favicon
