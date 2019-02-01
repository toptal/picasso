import React from 'react'

import IconsLibrary from './IconsLibrary'

interface Props {
  name: string
}

const SVG_PREFIX = 'Svg'
const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.substring(1)

const Icon: React.FunctionComponent<Props> = props => {
  const { name, ...rest } = props
  const iconComponentName = SVG_PREFIX + capitalizeFirstLetter(name)
  const IconComponent = IconsLibrary.listOfImportedIcons[iconComponentName]

  // @ts-ignore
  return <IconComponent {...rest} />
}

export default Icon
