// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Input as PicassoInput,
  NumberInput as PicassoNumberInput,
  Autocomplete as PicassoAutoComplete,
  PasswordInput as PicassoPasswordInput,
  DatePicker as PicassoDatePicker,
  TimePicker as PicassoTimePicker,
  Select as PicassoSelect,
  TagSelector as PicassoTagSelector,
  FieldRequirements
} from '@toptal/picasso'

const Example = () => (
  <div>
    <PicassoInput value={value} onChange={handleChange} error={false} />
    <PicassoNumberInput
      value={value}
      onChange={handleChange}
      step='5'
      max='100'
      min='-100'
      icon={<ReferralBonus16 />}
      error
    />
    <PicassoAutoComplete
      placeholder='Start typing country...'
      options={options}
      value=''
      width='full'
      error={true}
    />
    <PicassoPasswordInput
      disabled
      value={value}
      onChange={handleChange}
      error
    />
    <PicassoDatePicker value={value} onChange={handleChange} error />
    <PicassoTimePicker value={value} onChange={handleChange} error />
    <PicassoSelect value={value} onChange={handleChange} error />
    <PicassoTagSelector value={value} onChange={handleChange} error />
    <FieldRequirements
      style={{ maxWidth: 300 }}
      description='Please provide a value that fulfills the requirements'
      open={open}
      requirements={requirements}
      value={value}
      error
    />
  </div>
)

export default Example
