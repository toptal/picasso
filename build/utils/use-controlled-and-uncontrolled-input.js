import useControlledAndUncontrolledState from './use-controlled-and-uncontrolled-state';
const useControlledAndUncontrolledInput = (defaultInputValue, inputValue, onChange) => {
    const [value, setValue] = useControlledAndUncontrolledState(defaultInputValue || '', inputValue, newValue => onChange(newValue));
    return [value, setValue];
};
export default useControlledAndUncontrolledInput;
//# sourceMappingURL=use-controlled-and-uncontrolled-input.js.map