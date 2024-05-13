/**
 * Capitalizes the first letter of a string
 */
export const capitalizeFirst = (text: string) =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`
