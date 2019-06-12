"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kebabToCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
exports.default = kebabToCamelCase;
//# sourceMappingURL=kebab-to-camel-case.js.map