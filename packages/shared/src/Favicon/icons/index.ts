import { EnvironmentType } from '../../Picasso'

const getIcons = (environment: EnvironmentType<'temploy'>) => {
  if (environment === 'temploy') {
    return import('./temploy')
  }

  if (environment === 'staging') {
    return import('./staging')
  }

  if (environment === 'production') {
    return import('./production')
  }

  return import('./development')
}

export { getIcons }
