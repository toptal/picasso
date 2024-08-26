export const contentClass: Record<'content' | 'contentVisible', string> = {
  content: `overflow-y-auto max-h-[14.75rem]
  [@media(max-height:585px)]:max-h-[calc(50vh-3rem)]
  [@media(max-height:585px)]:md:max-h-[calc(50vh-3.5rem)]`,
  contentVisible: `max-h-screen overflow-y-scroll md:max-h-none md:overflow-y-hidden
    [@media(max-height:585px)]:max-h-screen overflow-y-scroll`,
}
