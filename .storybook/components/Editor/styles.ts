// PicassoRootNode's subtree font default is zero-specificity (`:where(.root) *`),
// so this ordinary (0,1,0) monospace rule wins naturally — no `!important` needed.
export const root =
  'w-full [&_*]:font-[Monaco,Menlo,Ubuntu_Mono,Consolas,source-code-pro,monospace]'
