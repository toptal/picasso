import { assertVisuals } from '../../puppeteer'

test('Primary', assertVisuals('Button', 'Button'))
test('Secondary', assertVisuals('Button', 'variants'))
test('Flat', assertVisuals('Button', 'colors'))
