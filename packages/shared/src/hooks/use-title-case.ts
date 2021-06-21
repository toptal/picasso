import { useAppConfig } from '../Picasso/RootContext'

export const useTitleCase = (componentTitleCase?: boolean) => {
  const { titleCase: appTitleCase } = useAppConfig()

  return componentTitleCase ?? appTitleCase
}
