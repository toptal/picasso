import { assertVisuals } from '../../puppeteer'

test('Default', assertVisuals('Accordion', 'Accordion'))
test('Group', assertVisuals('Accordion', 'Accordion Group'))
