"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fullName) => {
    return fullName
        .split(' ')
        .map(word => {
        if (word === '' || word.length <= 1) {
            return '';
        }
        return word[0];
    })
        .join('');
};
//# sourceMappingURL=get-name-initials.js.map