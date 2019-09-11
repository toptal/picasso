declare const useControlledAndUncontrolledState: <T>(defaultValue: T | null | undefined, value: T | null | undefined, onChange: (newValue: T | null) => void) => [T | null, (newValue: T | null) => void];
export default useControlledAndUncontrolledState;
