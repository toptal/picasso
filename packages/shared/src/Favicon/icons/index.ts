import { EnvironmentType } from '../types'

const getIcons = (environment: EnvironmentType) => {
  if (environment === 'staging' || environment === 'production') {
    return import(`./${environment}`)
  }

  return import('./development')
}

export { getIcons }
