import { useAppConfig } from '../Picasso'

export const useTitleCase = (componentTitleCase?: boolean) => {
  const { titleCase: appTitleCase } = useAppConfig()
  return componentTitleCase ?? appTitleCase
}
