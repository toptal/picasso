import useControlledAndUncontrolledState from './use-controlled-and-uncontrolled-state'

const useControlledAndUncontrolledInput = (
  defaultInputValue: string | undefined,
  inputValue: string | undefined,
  onChange: (newValue: string) => void
): [string, (newValue: string) => void] => {
  const [value, setValue] = useControlledAndUncontrolledState(
    defaultInputValue || '',
    inputValue,
    newValue => onChange(newValue!)
  )

  return [value!, setValue as (newValue: string) => void]
}

export default useControlledAndUncontrolledInput
