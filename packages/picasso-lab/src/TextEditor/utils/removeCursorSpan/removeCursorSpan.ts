/* eslint-disable-next-line no-irregular-whitespace */
const pattern = /(<(strong|em)>)?(<(strong|em)>)(<span class="ql-cursor">﻿<\/span>)(<\/\4>)(<\/\2>)?/

const removeCursorSpan = (value: string) => value.replace(pattern, '<br>')

export default removeCursorSpan
