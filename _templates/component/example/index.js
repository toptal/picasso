const AVAILABLE_PACKAGES = [
  'picasso',
  'picasso-lab',
  'picasso-forms',
  'picasso-charts',
  'picasso-provider'
]

const DEFAULT_EXAMPLE_COMMAND = 'example'

/**
 * @example yarn generate:example ComponentName ExampleName Package
 * @example yarn generate:example --component=ComponentName --example=ExampleName --package=Package
 * @example yarn generate:example
 */
module.exports = {
  prompt: ({ prompter, args }) => {
    const argvComponent = process.argv[process.argv.length - 3]
    const argvExampleName = process.argv[process.argv.length - 2]
    const argvPackage = process.argv[process.argv.length - 1]

    const inputAsParams =
      AVAILABLE_PACKAGES.includes(argvPackage) &&
      argvExampleName !== DEFAULT_EXAMPLE_COMMAND

    const inputsAsArgs =
      args.component &&
      args.example &&
      args.package &&
      AVAILABLE_PACKAGES.includes(args.package)

    if (inputAsParams) {
      return Promise.resolve({
        component: argvComponent,
        example: argvExampleName,
        package: argvPackage
      })
    }
    if (inputsAsArgs) {
      return Promise.resolve({
        component: args.component,
        example: args.example,
        package: args.package
      })
    }

    return prompter.prompt([
      {
        type: 'input',
        name: 'component',
        message: "What's the component name?"
      },
      {
        type: 'input',
        name: 'example',
        message: "What's the example name?"
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
