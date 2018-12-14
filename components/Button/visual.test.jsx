import { assertVisuals } from '../../puppeteer'

test('Primary', assertVisuals('Button', 'primary'))
test('Secondary', assertVisuals('Button', 'secondary'))
test('Flat', assertVisuals('Button', 'flat'))
test('Basic', assertVisuals('Button', 'basic'))
