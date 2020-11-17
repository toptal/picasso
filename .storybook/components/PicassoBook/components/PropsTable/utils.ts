function sortBy<T>(array: T[], callback: (item: T) => string | number) {
  return array
    .slice()
    .sort((item1, item2) => (callback(item1) >= callback(item2) ? 1 : -1))
}

export { sortBy }
