const exec = require('child_process').execSync

const safeExec = cmd => {
  try {
    exec(
      cmd,
      { stdio: [process.stdin, process.stdout, process.stderr] },
      (error, stdout) => {
        if (error) {
          process.exit(1)
        } else {
          return stdout
        }
      }
    )
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

module.exports = { safeExec }
