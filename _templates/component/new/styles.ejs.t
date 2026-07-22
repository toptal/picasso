---
to: packages/<%= package %>/src/<%= h.changeCase.pascalCase(name) %>/styles.ts
---
// Pure class-building helpers: return string[] and compose with
// twMerge(...classes, className) at the call site — the consumer className is
// merged last so it wins on conflicts.
export const createRootClassNames = (): string[] => []
