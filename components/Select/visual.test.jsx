import { assertVisuals } from '../../puppeteer'

test('Default', assertVisuals('Select', 'default'))
test('Outlined', assertVisuals('Select', 'outlined'))
test('Outlined', assertVisuals('Select', 'outlined open', 500))
