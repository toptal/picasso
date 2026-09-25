// React 18 reflects an empty `value` prop on an <input> as a `value=""`
// attribute; React 19 sets only the property. Dropping the attribute keeps
// one snapshot valid for both — it carries nothing the property does not.
//
// Only <input>: on <option> an empty `value` is meaningful (without it the
// option's value falls back to its text), and both majors agree there.
const EMPTY_VALUE_INPUT = 'input[value=""]'

const isEmptyValueInput = element =>
  element.tagName === 'INPUT' && element.getAttribute('value') === ''

module.exports = {
  test: value =>
    value instanceof HTMLElement &&
    (isEmptyValueInput(value) ||
      value.querySelector(EMPTY_VALUE_INPUT) !== null),

  serialize: (value, config, indentation, depth, refs, printer) => {
    const clone = value.cloneNode(true)

    if (isEmptyValueInput(clone)) {
      clone.removeAttribute('value')
    }

    clone
      .querySelectorAll(EMPTY_VALUE_INPUT)
      .forEach(element => element.removeAttribute('value'))

    return printer(clone, config, indentation, depth, refs)
  },
}
