/// <reference types="cypress" />

// 3px ring at 48% opacity, last of Tailwind's stacked shadows
export const FOCUS_RING = / 0\.48\) 0px 0px 0px 3px$/
// The same ring in white
export const WHITE_FOCUS_RING = /color\(srgb 1 1 1 \/ 0\.48\) 0px 0px 0px 3px$/
// The inset ring, first of the stacked shadows
export const INSET_FOCUS_RING = / 0\.48\) 0px 0px 0px 3px inset/
// The same ring in white
export const WHITE_INSET_FOCUS_RING =
  /^color\(srgb 1 1 1 \/ 0\.48\) 0px 0px 0px 3px inset/

// jQuery can't match `:focus-visible`
export const toMatchFocusVisible =
  (expected: boolean) => ($el: JQuery<HTMLElement>) =>
    expect($el[0].matches(':focus-visible'), ':focus-visible').to.equal(
      expected
    )

export const toHaveStyle =
  (
    property:
      | 'backgroundColor'
      | 'borderRadius'
      | 'boxShadow'
      | 'left'
      | 'opacity'
      | 'right'
      | 'zIndex',
    match: string | RegExp,
    { expected = true, pseudo }: { expected?: boolean; pseudo?: string } = {}
  ) =>
  ($el: JQuery<HTMLElement>) => {
    const value = window.getComputedStyle($el[0], pseudo)[property]
    const matches =
      typeof match === 'string' ? value === match : match.test(value)

    expect(matches, `${property} "${value}"`).to.equal(expected)
  }
