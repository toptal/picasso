import { withClasses } from '../with-classes'

describe('withClasses', () => {
  type Key = 'root' | 'label' | 'icon'
  const base: Record<Key, string> = {
    root: 'inline-flex items-center px-4 py-2',
    label: 'font-semibold text-base',
    icon: 'mr-2',
  }

  it('returns the base map unchanged when overrides is undefined', () => {
    expect(withClasses(base, undefined)).toBe(base)
  })

  it('returns the base map unchanged when overrides is an empty object', () => {
    const result = withClasses(base, {})

    expect(result).toEqual(base)
  })

  it('merges a single slot override via twMerge', () => {
    const result = withClasses(base, { root: 'bg-blue-500' })

    expect(result.root).toContain('inline-flex')
    expect(result.root).toContain('bg-blue-500')
    // Other slots untouched
    expect(result.label).toBe(base.label)
    expect(result.icon).toBe(base.icon)
  })

  it('merges multiple slot overrides independently', () => {
    const result = withClasses(base, {
      root: 'rounded',
      label: 'text-red-500',
    })

    expect(result.root).toContain('rounded')
    expect(result.root).toContain('inline-flex')
    expect(result.label).toContain('text-red-500')
    expect(result.label).toContain('font-semibold')
    expect(result.icon).toBe(base.icon)
  })

  it('uses twMerge dedupe so overriding utility wins over base', () => {
    // twMerge resolves Tailwind utility conflicts: the LATER class wins
    // for utilities in the same group (e.g. px-2 wins over px-4).
    const result = withClasses(base, { root: 'px-8' })

    expect(result.root).toContain('px-8')
    expect(result.root).not.toContain('px-4')
    // Non-conflicting utilities preserved
    expect(result.root).toContain('inline-flex')
    expect(result.root).toContain('items-center')
    expect(result.root).toContain('py-2')
  })

  it('does not mutate the base map', () => {
    const baseCopy = { ...base }

    withClasses(base, { root: 'something-else' })

    expect(base).toEqual(baseCopy)
  })

  it('ignores override entries that are empty strings or falsy', () => {
    const result = withClasses(base, {
      root: '',
      label: undefined,
    } as Partial<Record<Key, string>>)

    // Empty string and undefined skipped → base preserved
    expect(result.root).toBe(base.root)

    expect(result.label).toBe(base.label)
  })

  it('handles a fully-overridden map', () => {
    const result = withClasses(base, {
      root: 'block w-full',
      label: 'italic',
      icon: 'ml-1',
    })

    expect(result.root).toContain('block')
    expect(result.root).toContain('w-full')
    expect(result.label).toContain('italic')
    expect(result.icon).toContain('ml-1')
    expect(result.icon).toContain('mr-2')
  })
})
