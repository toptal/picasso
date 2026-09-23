---
'@toptal/picasso-date-picker': patch
'@toptal/picasso': patch
---

### DatePicker

- show a value that arrives while the input is focused and still empty, instead of leaving it blank and submitting `null`. A form library that registers fields in an effect, such as `react-final-form@7`, delivers the first value after an autofocused picker has mounted. Text the user typed, and a field they cleared, stay as they left them while the input has focus
