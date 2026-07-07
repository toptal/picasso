import { buildResponsiveCss } from './inject-responsive-styles'

describe('buildResponsiveCss', () => {
  it('emits one media-query rule per breakpoint and prop', () => {
    const css = buildResponsiveCss(['margin-top'], 'Test')

    expect(css).toContain(
      '@media (min-width:768px){.Test-md--margin-top{margin-top:var(--picasso-responsive--md--margin-top)}}'
    )
    expect(css).toContain(
      '@media (min-width:0px){.Test-xs--margin-top{margin-top:var(--picasso-responsive--xs--margin-top)}}'
    )
  })

  it('emits breakpoints largest-first (preserving the legacy cascade order)', () => {
    const css = buildResponsiveCss(['margin-top'], 'Test')

    const xlIndex = css.indexOf('xl--margin-top')
    const xsIndex = css.indexOf('xs--margin-top')

    expect(xlIndex).toBeGreaterThanOrEqual(0)
    expect(xlIndex).toBeLessThan(xsIndex)
  })
})
