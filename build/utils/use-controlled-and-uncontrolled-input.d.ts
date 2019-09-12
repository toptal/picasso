declare const useControlledAndUncontrolledInput: (defaultInputValue: string | undefined, inputValue: string | undefined, onChange: (newValue: string) => void) => [string, (newValue: string) => void];
export default useControlledAndUncontrolledInput;
