const DEFAULT_EXAMPLE_COMMAND = 'example'

module.exports = {
  prompt: ({ prompter, args }) => {
    const argvComponent = process.argv[process.argv.length - 2]
    const argvExampleName = process.argv[process.argv.length - 1]

    if (argvExampleName !== DEFAULT_EXAMPLE_COMMAND) {
      return Promise.resolve({
        component: argvComponent,
        example: argvExampleName
      })
    } else if (args.component && args.example) {
      return Promise.resolve({
        component: args.component,
        example: args.example
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
      }
    ])
  }
}
