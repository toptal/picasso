import { useAppConfig } from '@toptal/picasso-provider'

export const useTitleCase = (componentTitleCase?: boolean) => {
  const { titleCase: appTitleCase } = useAppConfig()

  return componentTitleCase ?? appTitleCase
}
