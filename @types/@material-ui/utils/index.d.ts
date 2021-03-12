declare module '@material-ui/utils' {
  export function deepmerge<T, M> (target: T, source: M): T & M
}
