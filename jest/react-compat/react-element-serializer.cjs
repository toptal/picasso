// React 19 tags elements with `Symbol.for('react.transitional.element')`
// instead of `Symbol.for('react.element')`. pretty-format 29 only knows the
// old symbol, so it stops printing elements as JSX and dumps the element
// object with all its internals. Re-tag a shallow copy and hand it back to the
// printer, so element snapshots stay identical across React majors.
//
// The spread is safe: React 19 defines the deprecated `ref` accessor as
// non-enumerable, so copying the element does not trigger its warning.
const REACT_19_ELEMENT = Symbol.for('react.transitional.element')
const REACT_ELEMENT = Symbol.for('react.element')

module.exports = {
  test: value => Boolean(value) && value.$$typeof === REACT_19_ELEMENT,

  serialize: (value, config, indentation, depth, refs, printer) =>
    printer(
      { ...value, $$typeof: REACT_ELEMENT },
      config,
      indentation,
      depth,
      refs
    ),
}
