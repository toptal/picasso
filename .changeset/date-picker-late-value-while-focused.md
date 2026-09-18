---
'@toptal/picasso-date-picker': patch
'@toptal/picasso': patch
---

### DatePicker

- show a value that arrives while the input is focused and empty. The input skips an incoming `value` while it has focus, so as not to overwrite what someone is typing, but an empty input the user has not typed into has nothing to protect. A form library that registers its fields in an effect delivers the first value after mount, so an autofocused picker was focused before its value landed and kept an empty input while the calendar showed the right date, and the form then submitted `null`. The input becomes the user's on their first key press, so text they have typed, a field they have cleared, and a deletion on a field that was already empty all keep the input as they left it for as long as the focus lasts. Two guards close the window a test runner can still hit in the first frame after mount: the input reads focus from the DOM as well as from React state, since `autoFocus` focuses it during the commit and the focus state catches up a render later, so a value delivered in that frame counts as arriving into a focused input; and a focus change only re-formats what the input already shows and never fills an empty focused input, which is the value update's job
