import { assertVisuals } from '../../puppeteer'

test('Primary', assertVisuals('TextField', 'text'))
test('Secondary', assertVisuals('TextField', 'text%20with%20Icon'))
test('Flat', assertVisuals('TextField', 'select'))
test('Basic', assertVisuals('TextField', 'textarea'))
