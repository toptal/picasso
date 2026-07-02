export const codeStyles =
  'text-red-500 bg-gray-100 border border-gray-300 rounded-[2px] py-px px-1 text-[12px] [font-family:monospace] [text-wrap:wrap] [word-break:break-word]'

export const codeBlockStyles =
  'bg-gray-100 rounded-sm py-1 px-2 block [font-family:monospace] text-[11px] leading-[18px] text-black [text-wrap:wrap] [word-break:break-word] m-0 [tab-size:2]'

const styles: Record<string, string> = {
  code: codeStyles,
  codeBlock: codeBlockStyles,
}

export default styles
