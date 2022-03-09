import React from 'react'
import { RichText } from '@toptal/picasso'
import { htmlToHast } from '@toptal/picasso/utils'

const html =
  '<h3>Position Description</h3><p>We’re looking for hardworking, self-starting Designers for our <strong>Product Design</strong> team to help us define how talent interacts with Toptal.</p><p>You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.</p><h3>Requirements</h3><ol><li>Collaborate with PMs and other designers to ship your first product features.</li><li>Learn about our design system.</li></ol><h3>Requirements</h3><ul><li>Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.</li><li>An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.</li></ul>'

const style = { maxWidth: '500px' }

const Example = () => {
  return <RichText style={style} value={htmlToHast(html)} />
}

export default Example
