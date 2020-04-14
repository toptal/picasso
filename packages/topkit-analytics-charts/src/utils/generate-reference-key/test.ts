import generateReferenceKey from './'

const POSTFIX = 1

test('should correctly generate reference keys', () => {
  const EXPECTED_KEY = `reference-${POSTFIX}`
  const generatedKey = generateReferenceKey(POSTFIX)
  expect(generatedKey).toEqual(EXPECTED_KEY)
})
