"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lab_1 = require("@toptal/picasso/lab");
const picasso_1 = require("@toptal/picasso");
const options = [
    { text: 'Belarus', value: 'BY', capital: 'Minsk' },
    { text: 'Croatia', value: 'HR', capital: 'Zagreb' },
    { text: 'Lithuania', value: 'LU', capital: 'Vilnius' },
    { text: 'Slovakia', value: 'SK', capital: 'Bratislava' },
    { text: 'Ukraine', value: 'UA', capital: 'Kyiv' }
];
const CustomOptionRenderer = () => (react_1.default.createElement("div", null,
    react_1.default.createElement(lab_1.Autocomplete, { placeholder: 'Start typing country...', options: options, renderOption: (option, index) => (react_1.default.createElement(picasso_1.Container, null,
            react_1.default.createElement(picasso_1.Typography, { size: 'medium', weight: 'semibold' }, option.text),
            react_1.default.createElement(picasso_1.Typography, { size: 'inherit', style: { fontSize: '12px' } },
                option.capital,
                " (",
                index,
                ")"))) })));
exports.default = CustomOptionRenderer;
//# sourceMappingURL=CustomOptionRenderer.example.js.map