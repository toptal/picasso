import type { EnvironmentType } from '../../types'
import * as temploy from './temploy'
import * as staging from './staging'
import * as production from './production'
import * as development from './development'

const getIcons = async (environment: EnvironmentType<'temploy'>) => {
  switch (environment) {
    case 'temploy':
      return temploy
    case 'staging':
      return staging
    case 'production':
      return production
    default:
      return development
  }
}

export { getIcons }
