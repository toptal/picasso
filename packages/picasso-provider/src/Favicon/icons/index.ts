import type { EnvironmentType } from '../../types'
import * as Temploy from './temploy'
import * as Staging from './staging'
import * as Production from './production'
import * as Development from './development'

const getIcons = async (environment: EnvironmentType<'temploy'>) => {
  if (environment === 'temploy') {
    return Temploy
  }

  if (environment === 'staging') {
    return Staging
  }

  if (environment === 'production') {
    return Production
  }

  return Development
}

export { getIcons }
