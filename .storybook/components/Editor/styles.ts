// The trailing `!` beats PicassoRootNode's app-wide `[&_*]:font-sans` (which has
// equal specificity), so the code editor keeps its monospace font — matching the
// pre-migration cascade where JSS injection order let this win.
export const root =
  'w-full [&_*]:font-[Monaco,Menlo,Ubuntu_Mono,Consolas,source-code-pro,monospace]!'
