"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (value, str) => {
    const query = (value || '').trim().toLowerCase();
    return str.toLowerCase().includes(query);
};
//# sourceMappingURL=isSubstring.js.map