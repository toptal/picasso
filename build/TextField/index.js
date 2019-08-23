"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = __importDefault(require("../Input"));
const with_deprecation_warning_1 = __importDefault(require("../utils/with-deprecation-warning"));
// TextField component is deprecated and
// have to be removed in v4 of Picasso
exports.default = with_deprecation_warning_1.default('TextField', 'Input')(Input_1.default);
//# sourceMappingURL=index.js.map