module.exports = {
  launch: {
    executablePath: process.env.CHROME_BIN || null,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  }
}
