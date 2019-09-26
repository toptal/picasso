import { useState, useCallback } from 'react';
const useControlledAndUncontrolledState = (defaultValue, value, onChange) => {
    const [internalValue, setInternalValue] = useState(defaultValue !== undefined ? defaultValue : null);
    const actualValue = value !== undefined ? value : internalValue;
    const setActualValue = useCallback((newValue) => {
        setInternalValue(newValue);
        onChange(newValue);
    }, [onChange]);
    return [actualValue, setActualValue];
};
export default useControlledAndUncontrolledState;
//# sourceMappingURL=use-controlled-and-uncontrolled-state.js.map