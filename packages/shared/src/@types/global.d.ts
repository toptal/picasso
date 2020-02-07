// TypeScript doesn't understand PNGs by default,
// this type definition ensures TypeScript that png is good
// and can be imported (but with no check on existence)
declare module '*.png' {
  const content: string

  export default content
}
