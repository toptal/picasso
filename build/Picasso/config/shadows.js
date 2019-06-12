"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shadows_1 = __importDefault(require("@material-ui/core/styles/shadows"));
const shadows = [
    ...[
        'none',
        /** notification center, paper */
        '0 0 8px 0 rgba(0,0,0, 0.08)',
        /** modal */
        '0 4px 8px 0 rgba(0,0,0, 0.08)',
        /** nofication growl */
        '0 0 8px 0 rgba(0,0,0, 0.16)',
        /** tooltip */
        '0 0 4px 0 rgba(0,0,0, 0.24), 0 0 32px 0 rgba(0,0,0, 0.12)'
    ],
    ...shadows_1.default.slice(5)
];
exports.default = shadows;
//# sourceMappingURL=shadows.js.map