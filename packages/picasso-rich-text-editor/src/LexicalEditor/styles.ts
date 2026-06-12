import { codeBlockStyles, codeStyles } from '../RichText/components/styles'

// SVG list-bullet backgrounds. Whitespace is %20-encoded so the data URI is a
// single token usable inside a Tailwind arbitrary value.
const outlinedBullet =
  "url(\"data:image/svg+xml,%3Csvg%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8%209c.55228%200%201-.44772%201-1s-.44772-1-1-1-1%20.44772-1%201%20.44772%201%201%201Zm0%201c1.10457%200%202-.89543%202-2s-.89543-2-2-2-2%20.89543-2%202%20.89543%202%202%202Z'%20fill='%23455065'/%3E%3C/svg%3E\")"
const bullet =
  "url(\"data:image/svg+xml,%3Csvg%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Ccircle%20cx='8'%20cy='8'%20r='2'%20fill='%23455065'/%3E%3C/svg%3E\")"

// `counter-reset: list-0` on every non-li descendant. The legacy JSS also reset
// list-1..list-9 on block elements, but that rule was emitted first and fully
// overridden by this equal-specificity rule, so it is omitted (computed-identical).
const listStyles = '[&_*:not(li)]:[counter-reset:list-0]'

const indentStyles = [
  // level 2 — lower-alpha + outlined bullet (even level)
  '[&_ol.indent-level-2>li:not(.nested-list-item)]:[counter-increment:list-2]',
  "[&_ol.indent-level-2>li:not(.nested-list-item)]:before:content-[counter(list-2,lower-alpha)_'.']",
  `[&_ul.indent-level-2>li:not(.nested-list-item)]:before:[background-image:${outlinedBullet}]`,
  // level 3 — lower-roman
  '[&_ol.indent-level-3>li:not(.nested-list-item)]:[counter-increment:list-3]',
  "[&_ol.indent-level-3>li:not(.nested-list-item)]:before:content-[counter(list-3,lower-roman)_'.']",
  // level 4 — decimal + outlined bullet (even level)
  '[&_ol.indent-level-4>li:not(.nested-list-item)]:[counter-increment:list-4]',
  "[&_ol.indent-level-4>li:not(.nested-list-item)]:before:content-[counter(list-4,decimal)_'.']",
  `[&_ul.indent-level-4>li:not(.nested-list-item)]:before:[background-image:${outlinedBullet}]`,
  // level 5 — lower-alpha
  '[&_ol.indent-level-5>li:not(.nested-list-item)]:[counter-increment:list-5]',
  "[&_ol.indent-level-5>li:not(.nested-list-item)]:before:content-[counter(list-5,lower-alpha)_'.']",
].join(' ')

const margins = [
  '[&_p]:my-2 [&_code[dir]]:my-2',
  '[&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:mx-0',
  '[&_p:first-child]:mt-0 [&_p:first-child]:mb-2 [&_p:first-child]:mx-0',
  '[&_h3:first-child]:mt-0 [&_h3:first-child]:mb-2 [&_h3:first-child]:mx-0',
  '[&_code[dir]:first-child]:mt-0 [&_code[dir]:first-child]:mb-2 [&_code[dir]:first-child]:mx-0',
  '[&_li:not(:last-child)]:mt-0 [&_li:not(:last-child)]:mb-2 [&_li:not(:last-child)]:mx-0',
  '[&_ol]:p-0 [&_ol]:my-2 [&_ol]:mx-0 [&_ul]:p-0 [&_ul]:my-2 [&_ul]:mx-0',
].join(' ')

const editorContainer = [
  'h-[12.5em] overflow-y-hidden resize-y relative text-[14px]',
  listStyles,
  indentStyles,
  margins,
].join(' ')

const styles: Record<string, string> = {
  editorContainer,

  contentEditable: 'outline-none h-full px-2 py-4 [tab-size:4] overflow-y-auto',

  placeholder:
    'overflow-hidden absolute text-ellipsis top-0 left-0 select-none whitespace-normal inline-block pointer-events-none',

  paragraph: 'mt-0 mb-2 mx-0',

  listItem:
    'list-none pl-6 relative before:inline-block before:absolute before:left-0 before:whitespace-nowrap before:w-4',

  ol: "[&>li:not(.nested-list-item)]:[counter-increment:list-0] [&>li:not(.nested-list-item)]:before:content-[counter(list-0,decimal)_'.']",

  ul: `[&>li:not(.nested-list-item)]:before:content-[''] [&>li:not(.nested-list-item)]:before:[background-image:${bullet}] [&>li:not(.nested-list-item)]:before:bg-no-repeat [&>li:not(.nested-list-item)]:before:bg-center [&>li:not(.nested-list-item)]:before:h-[22px] [&>li:not(.nested-list-item)]:before:w-4`,

  bold: 'font-semibold',
  italic: 'italic',
  customEmoji: '[&>img]:align-bottom [&>img]:w-[22px] [&>img]:h-[22px]',
  code: codeStyles,
  codeBlock: `${codeBlockStyles} [&_*]:[font-family:monospace]`,
  codeBlockText:
    '[font-family:inherit] [font-size:inherit] leading-[inherit] text-inheritColor',
}

export default styles
