import { FieldRequirements } from '@toptal/picasso'

import Form from '../Form'
import Autocomplete from '../Autocomplete'
import Input from '../Input'
import Select from '../Select'
import Radio from '../Radio'
import ButtonRadio from '../ButtonRadio'
import RadioGroup from '../RadioGroup'
import Checkbox from '../Checkbox'
import ButtonCheckbox from '../ButtonCheckbox'
import CheckboxGroup from '../CheckboxGroup'
import NumberInput from '../NumberInput'
import FileInput from '../FileInput'
import DatePicker from '../DatePicker'
import TimePicker from '../TimePicker'
import TagSelector from '../TagSelector'
import SubmitButton from '../SubmitButton'
import Switch from '../Switch'
import Rating from '../Rating'
import Dropzone from '../Dropzone'
import RichTextEditor from '../RichTextEditor'
import PasswordInput from '../PasswordInput'
import { FormConfigContext } from '../FormConfig'
import AvatarUpload from '../AvatarUpload'

type FormCompoundType = typeof Form & {
  Autocomplete: typeof Autocomplete
  Input: typeof Input
  Select: typeof Select
  Radio: typeof Radio
  ButtonRadio: typeof ButtonRadio
  RadioGroup: typeof RadioGroup
  Checkbox: typeof Checkbox
  ButtonCheckbox: typeof ButtonCheckbox
  CheckboxGroup: typeof CheckboxGroup
  NumberInput: typeof NumberInput
  FileInput: typeof FileInput
  DatePicker: typeof DatePicker
  TimePicker: typeof TimePicker
  TagSelector: typeof TagSelector
  SubmitButton: typeof SubmitButton
  ConfigProvider: typeof FormConfigContext.Provider
  Switch: typeof Switch
  Rating: typeof Rating
  Dropzone: typeof Dropzone
  PasswordInput: typeof PasswordInput
  FieldRequirements: typeof FieldRequirements
  RichTextEditor: typeof RichTextEditor
  AvatarUpload: typeof AvatarUpload
}

export const FormCompound: FormCompoundType = Object.assign(Form, {
  Autocomplete: Autocomplete,
  Input: Input,
  Select: Select,
  Radio: Radio,
  ButtonRadio: ButtonRadio,
  RadioGroup: RadioGroup,
  Checkbox: Checkbox,
  ButtonCheckbox: ButtonCheckbox,
  CheckboxGroup: CheckboxGroup,
  NumberInput: NumberInput,
  FileInput: FileInput,
  DatePicker: DatePicker,
  TimePicker: TimePicker,
  TagSelector: TagSelector,
  SubmitButton: SubmitButton,
  ConfigProvider: FormConfigContext.Provider,
  Switch: Switch,
  Rating: Rating,
  Dropzone: Dropzone,
  PasswordInput: PasswordInput,
  FieldRequirements: FieldRequirements,
  RichTextEditor: RichTextEditor,
  AvatarUpload: AvatarUpload,
})
