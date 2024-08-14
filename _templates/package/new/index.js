module.exports = {
  prompt: async ({ prompter }) => {
    const { isBasePackage } = await prompter.prompt({
      type: 'confirm',
      name: 'isBasePackage',
      message: 'Is this a BASE package? Will be created in /packages/base',
      initial: true,
      default: 'Y/n',
    })

    const formatPath = value =>
      isBasePackage ? `@toptal/picasso-${value}` : `@toptal/${value}`

    const { shortName } = await prompter.prompt({
      type: 'input',
      name: 'shortName',
      format: formatPath,
      message: `Package name without the namespace${
        isBasePackage ? " and 'picasso' prefix" : ''
      }`,
    })

    const packageName = formatPath(shortName)

    const packagePath = isBasePackage
      ? `packages/base/${
          // Capitalize the first letter of the package if it's in the base folder
          shortName.charAt(0).toUpperCase() + shortName.substring(1)
        }`
      : `packages/${shortName}`

    return { isBasePackage, packageName, shortName, packagePath }
  },
}
