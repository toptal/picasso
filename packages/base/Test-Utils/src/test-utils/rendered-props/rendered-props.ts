type MockWithCalls<Call extends readonly unknown[]> = {
  mock: { calls: Call[] }
}

/**
 * Props each render of a mocked component received, in call order.
 *
 * React 18 passes function components a second, legacy-context argument and
 * React 19 does not, so `toHaveBeenCalledWith(props, {})` only passes on one
 * of them. Compare the props alone instead:
 *
 *   expect(renderedProps(ButtonMock)).toContainEqual(
 *     expect.objectContaining({ disabled: true })
 *   )
 */
export const renderedProps = <Call extends readonly unknown[]>(
  mock: MockWithCalls<Call>
): Call[0][] => mock.mock.calls.map(call => call[0])
