const DEFAULT_NEWCOMPONENT_COMMAND = 'new'

module.exports = {
  prompt: ({ prompter, args }) => {
    const argvName = process.argv[process.argv.length - 1]

    if (argvName !== DEFAULT_NEWCOMPONENT_COMMAND) {
      return Promise.resolve({ name: argvName })
    } else if (args.name) {
      return Promise.resolve({ name: args.name })
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
        choices: [
          'picasso',
          'picasso-lab',
          'picasso-forms',
          'picasso-charts',
          'picasso-provider'
        ]
      }
    ])
  }
}
