import { assertVisuals } from '../../puppeteer'

test('Text', assertVisuals('TextField', 'text'))
test('With icon', assertVisuals('TextField', 'text with Icon'))
test('Select', assertVisuals('TextField', 'select'))
test('Textarea', assertVisuals('TextField', 'textarea'))
