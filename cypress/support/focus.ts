/// <reference types="cypress" />

// jQuery can't match `:focus-visible`
export const toMatchFocusVisible =
  (expected: boolean) => ($el: JQuery<HTMLElement>) =>
    expect($el[0].matches(':focus-visible'), ':focus-visible').to.equal(
      expected
    )

export const toHaveStyle =
  (
    property: 'backgroundColor' | 'boxShadow' | 'left' | 'opacity' | 'right',
    match: string | RegExp,
    { expected = true, pseudo }: { expected?: boolean; pseudo?: string } = {}
  ) =>
  ($el: JQuery<HTMLElement>) => {
    const value = window.getComputedStyle($el[0], pseudo)[property]
    const matches =
      typeof match === 'string' ? value === match : match.test(value)

    expect(matches, `${property} "${value}"`).to.equal(expected)
  }
