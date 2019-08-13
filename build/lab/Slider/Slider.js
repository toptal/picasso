'use strict'
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const react_1 = __importStar(require('react'))
const styles_1 = require('@material-ui/core/styles')
const Slider_1 = __importDefault(require('@material-ui/lab/Slider'))
const styles_2 = __importDefault(require('./styles'))
exports.Slider = ({
  classes,
  onChange = () => {},
  min,
  max,
  value: initialValue,
  step,
  disabled
}) => {
  const [value, setValue] = react_1.useState(initialValue)
  const getNormalizedValue = value => {
    let currentValue = value < 0 ? 0 : value
    currentValue = currentValue > max ? max : currentValue
    return currentValue
  }
  const handleChange = (event, value) => {
    const currentValue = getNormalizedValue(value)
    setValue(currentValue)
    onChange(event, currentValue)
  }
  react_1.useEffect(() => {
    const currentValue = getNormalizedValue(initialValue)
    setValue(currentValue)
  }, [initialValue])
  return react_1.default.createElement(Slider_1.default, {
    min: min,
    max: max,
    value: value,
    onChange: handleChange,
    classes: classes,
    step: step,
    disabled: disabled
  })
}
exports.Slider.defaultProps = {}
exports.Slider.displayName = 'Slider'
exports.Slider.defaultProps = {
  max: 100,
  min: 0,
  onChange: () => {},
  value: 0
}
exports.default = styles_1.withStyles(styles_2.default)(exports.Slider)
//# sourceMappingURL=Slider.js.map
