// eslint-disable-next-line import/no-extraneous-dependencies
import execa from 'execa'

import print from './print.cjs'

export const runSync = (command, args, options) => {
  try {
    print.grey('info: ', [command, ...args].join(' '))
    console.log('@@@ davinci-cli-shared runSync called with:', {
      command,
      args,
      options,
    })

    const result = execa.sync(command, args, {
      stdio: 'inherit',
      ...options,
    })

    console.log('@@@ davinci-cli-shared runSync result:', {
      exitCode: result.exitCode,
      stdout: result.stdout,
      stderr: result.stderr,
      all: result.all,
    })

    return result
  } catch (e) {
    process.stderr.write('\n@@@ davinci-cli-shared runSync error:\n')
    const errorString = JSON.stringify(e)

    for (let i = 0; i < errorString.length; i += 1000) {
      process.stderr.write(`[${i}]: ${errorString.slice(i, i + 1000)}\n`)
    }
    process.stderr.write(`Command: ${[command, ...args].join(' ')}\n`)
    process.stderr.write(`Message: ${e.message || 'No message'}\n`)
    process.stderr.write(`Exit Code: ${e.exitCode || 'unknown'}\n`)

    if (e.stdout) {
      process.stderr.write(`\n--- STDOUT (${e.stdout.length} chars) ---\n`)
      process.stderr.write(e.stdout)
      process.stderr.write('\n--- END STDOUT ---\n')
    }

    if (e.stderr) {
      process.stderr.write(`\n--- STDERR (${e.stderr.length} chars) ---\n`)
      process.stderr.write(e.stderr)
      process.stderr.write('\n--- END STDERR ---\n')
    }

    if (e.all) {
      process.stderr.write(`\n--- ALL OUTPUT (${e.all.length} chars) ---\n`)
      process.stderr.write(e.all)
      process.stderr.write('\n--- END ALL OUTPUT ---\n')
    }

    process.stderr.write('\n')

    print.red(e)

    if (e.exitCode && e.exitCode !== 0) {
      process.exit(e.exitCode)
    }
  }
}

export const run = async (command, args, options) => {
  print.grey([command, ...args].join(' '))
  console.log('@@@ davinci-cli-shared run called with:', {
    command,
    args,
    options,
  })

  const subprocess = execa(command, args, options)

  subprocess.stdout.pipe(process.stdout)

  await subprocess
}

export default {
  run,
  runSync,
}
