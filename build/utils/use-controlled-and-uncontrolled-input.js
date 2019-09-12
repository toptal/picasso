"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_controlled_and_uncontrolled_state_1 = __importDefault(require("./use-controlled-and-uncontrolled-state"));
const useControlledAndUncontrolledInput = (defaultInputValue, inputValue, onChange) => {
    const [value, setValue] = use_controlled_and_uncontrolled_state_1.default(defaultInputValue || '', inputValue, newValue => onChange(newValue));
    return [value, setValue];
};
exports.default = useControlledAndUncontrolledInput;
//# sourceMappingURL=use-controlled-and-uncontrolled-input.js.map