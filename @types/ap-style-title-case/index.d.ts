declare module 'ap-style-title-case' {
  export default function titleCase(
    str: string,
    options?: {
      stopwords: string
      keepSpaces: boolean
    }
  ): string
}
