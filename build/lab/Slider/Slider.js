import React, { forwardRef, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUISlider from '@material-ui/core/Slider';
import styles from './styles';
export const Slider = forwardRef(function Slider({ classes, onChange = () => { }, min, max, value: initialValue, step, disabled }, ref) {
    const [value, setValue] = useState(initialValue);
    const getNormalizedValue = (value) => {
        let currentValue = value < 0 ? 0 : value;
        currentValue = (currentValue > max ? max : currentValue);
        return currentValue;
    };
    const handleChange = (event, value) => {
        const currentValue = getNormalizedValue(value);
        setValue(currentValue);
        onChange(event, currentValue);
    };
    useEffect(() => {
        const currentValue = getNormalizedValue(initialValue);
        setValue(currentValue);
    }, [initialValue]);
    return (React.createElement(MUISlider, { ref: ref, min: min, max: max, value: value, onChange: handleChange, classes: classes, step: step, disabled: disabled }));
});
Slider.defaultProps = {};
Slider.displayName = 'Slider';
Slider.defaultProps = {
    max: 100,
    min: 0,
    onChange: () => { },
    value: 0
};
export default withStyles(styles)(Slider);
//# sourceMappingURL=Slider.js.map