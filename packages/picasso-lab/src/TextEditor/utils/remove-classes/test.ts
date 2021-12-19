import removeClasses from './remove-classes'

describe('removeClasses', () => {
  it('does nothing when no classes', () => {
    const html = `<p>foobar</p>`

    expect(removeClasses(html)).toBe(html)
  })

  it('removes classes from html', () => {
    const html = `<h3 class="09eqcp-TextEditorTypography-headingMedium-69">Position Description</h3><p>We’re looking for hardworking, self-starting Designers for our Product Design team to help us define how talent interacts with Toptal. You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.</p><h3 class="09eqcp-TextEditorTypography-headingMedium-69">Requirements</h3><ol><li>Collaborate with PMs and other designers to ship your first product features.</li><li>Learn about our design system.</li></ol><h3 class="09eqcp-TextEditorTypography-headingMedium-69">Requirements</h3><ul><li>Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.</li><li>An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.</li></ul>`
    const expectedHtml = `<h3>Position Description</h3><p>We’re looking for hardworking, self-starting Designers for our Product Design team to help us define how talent interacts with Toptal. You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.</p><h3>Requirements</h3><ol><li>Collaborate with PMs and other designers to ship your first product features.</li><li>Learn about our design system.</li></ol><h3>Requirements</h3><ul><li>Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.</li><li>An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.</li></ul>`

    expect(removeClasses(html)).toBe(expectedHtml)
  })
})
