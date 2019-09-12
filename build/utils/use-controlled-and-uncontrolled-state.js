"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useControlledAndUncontrolledState = (defaultValue, value, onChange) => {
    const [internalValue, setInternalValue] = react_1.useState(defaultValue !== undefined ? defaultValue : null);
    const actualValue = value !== undefined ? value : internalValue;
    const setActualValue = react_1.useCallback((newValue) => {
        setInternalValue(newValue);
        onChange(newValue);
    }, [onChange]);
    return [actualValue, setActualValue];
};
exports.default = useControlledAndUncontrolledState;
//# sourceMappingURL=use-controlled-and-uncontrolled-state.js.map