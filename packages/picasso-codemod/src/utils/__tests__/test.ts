import core from 'jscodeshift'

import { addImportMember } from '..'
import { findSpecifierForImport } from '../find-specifier-for-import'
import { isImportFor } from '../is-import-for'
import { isSpecifierFor } from '../is-specifier-for'
import { PackageMember } from '../types'

const j = core

const PICASSO_PACKAGE_NAME = '@toptal/picasso'
const BAR_PACKAGE_MEMBER: PackageMember = {
  packageName: '@toptal/picasso',
  exportedName: 'Bar'
}

describe('add-import', () => {
  describe('when used to add an import', () => {
    it('adds member correctly to the last import of that package', () => {
      const srcFile = `
        import { Quux } from '@toptal/picasso';
        import { Foo } from '@toptal/picasso';`
      const root = j(srcFile)

      addImportMember(BAR_PACKAGE_MEMBER, root)

      const result = root.toSource()

      expect(result).toBe(`
        import { Quux } from '@toptal/picasso';
        import { Foo, Bar } from '@toptal/picasso';`)
    })
  })
})

describe('find-specifier-for-import', () => {
  describe('when searching for a specifier', () => {
    it('returns the last known specifier for that package member', () => {
      const srcFile = `
        import { Bar } from '@toptal/picasso';
        import { Bar as PicassoBar } from '@toptal/picasso';`
      const root = j(srcFile)

      const specifier = findSpecifierForImport(BAR_PACKAGE_MEMBER, root)

      expect(specifier).not.toBeUndefined()
      expect(specifier?.imported.name).toBe('Bar')
      expect(specifier?.local?.name).toBe('PicassoBar')
    })
  })
})

describe('is-import-for', () => {
  describe('when testing against imports', () => {
    it('returns true if ImportDeclaration is for a specific package', () => {
      const srcFile = `
        import { Form } from '@toptal/picasso-forms';
        import { Quux } from '@toptal/picasso';
        import { Bar as PicassoBar, Foo } from '@toptal/picasso';`
      const root = j(srcFile)

      const importDecl = root.find(j.ImportDeclaration, imp =>
        isImportFor(BAR_PACKAGE_MEMBER, imp)
      )

      expect(importDecl).not.toBeFalsy()
      expect(importDecl.size()).toBe(1)

      const [node] = importDecl.nodes()

      expect(node.source.value).toBe(PICASSO_PACKAGE_NAME)
      expect(
        node.specifiers?.some(
          specifier =>
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.name === BAR_PACKAGE_MEMBER.exportedName
        )
      ).toBe(true)
    })
  })
})

describe('is-specifier-for', () => {
  describe('when testing for a specific specifier', () => {
    it('returns the as true when the specifier matches', () => {
      const srcFile = `
        import { Quux } from '@toptal/picasso';
        import { Bar as PicassoBar, Foo } from '@toptal/picasso';`
      const root = j(srcFile)

      const result = root.find(j.ImportSpecifier, spec =>
        isSpecifierFor('Bar', spec)
      )

      expect(result.size()).toBe(1)

      const [specifier] = result.nodes()

      expect(specifier).not.toBeFalsy()
      expect(specifier.imported.name).toBe(BAR_PACKAGE_MEMBER.exportedName)
      expect(specifier.local?.name).toBe('PicassoBar')
    })
  })
})
