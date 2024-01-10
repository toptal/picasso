import type { EnvironmentType } from '../../types'

const getIcons = (environment: EnvironmentType<'temploy'>) => {
  if (environment === 'temploy') {
    return import('./temploy/index.js')
  }

  if (environment === 'staging') {
    return import('./staging/index.js')
  }

  if (environment === 'production') {
    return import('./production/index.js')
  }

  return import('./development/index.js')
}

export { getIcons }
