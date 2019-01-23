import { assertVisuals } from '../../puppeteer'

test('Text', assertVisuals('TextField', 'text'))
test('Error', assertVisuals('TextField', 'error'))
test('With icon', assertVisuals('TextField', 'text with Icon'))
test('Select', assertVisuals('TextField', 'select'))
test('Textarea', assertVisuals('TextField', 'textarea'))
