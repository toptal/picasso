const DEFAULT_NEWCOMPONENT_COMMAND = 'new'

const AVAILABLE_PACKAGES = [
  'picasso',
  'picasso-lab',
  'picasso-forms',
  'picasso-charts',
  'picasso-provider'
]

/**
 * @example yarn generate:component ComponentName picasso
 * @example yarn generate:component --name=ComponentName --package=picasso
 * @example yarn generate:component
 */
module.exports = {
  prompt: ({ prompter, args }) => {
    const argvPackage = process.argv[process.argv.length - 1]
    const argvName = process.argv[process.argv.length - 2]

    const inputsAsParams =
      AVAILABLE_PACKAGES.includes(argvPackage) &&
      argvName !== DEFAULT_NEWCOMPONENT_COMMAND

    const inputsAsArgs =
      args.name && args.package && AVAILABLE_PACKAGES.includes(args.package)

    if (inputsAsParams) {
      return Promise.resolve({ name: argvName, package: argvPackage })
    }

    if (inputsAsArgs) {
      return Promise.resolve({ name: args.name, package: args.package })
    }

    return prompter.prompt([
      {
        type: 'input',
        name: 'name',
        message: "What's the component name?"
      },
      {
        type: 'select',
        name: 'package',
        message: `To what package would you like to add component?`,
        choices: AVAILABLE_PACKAGES
      }
    ])
  }
}
