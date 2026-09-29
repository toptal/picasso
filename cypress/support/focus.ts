/// <reference types="cypress" />

// jQuery's selector engine doesn't support `:focus-visible`
export const toMatchFocusVisible =
  (expected: boolean) => ($el: JQuery<HTMLElement>) =>
    expect($el[0].matches(':focus-visible'), ':focus-visible').to.equal(
      expected
    )

export const toHaveStyle =
  (
    property: 'backgroundColor' | 'boxShadow',
    pattern: RegExp,
    { expected = true, pseudo }: { expected?: boolean; pseudo?: string } = {}
  ) =>
  ($el: JQuery<HTMLElement>) => {
    const value = window.getComputedStyle($el[0], pseudo)[property]

    expect(pattern.test(value), `${property} "${value}"`).to.equal(expected)
  }
