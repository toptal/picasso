"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 16;
const SvgCalendarReminder16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgCalendarReminder16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M8 1.041V0h1v1.073A5 5 0 0 1 13.271 6.9l-.955 5.416c-.038.218.187.54.402.579l-.174.984L1.718 11.97l.17-.985c.226.038.541-.183.58-.405l.955-5.417A5.002 5.002 0 0 1 8 1.042zm3.331 11.1l.956-5.416a4 4 0 0 0-7.879-1.39l-.955 5.417c-.03.17-.094.33-.184.476l8.074 1.423a1.345 1.345 0 0 1-.012-.51zm-5.358 1.472l.985.174a1 1 0 1 0 1.97.347l.985.174a2 2 0 1 1-3.94-.695zM1.251 3.7l.843.538a6.977 6.977 0 0 0-.988 2.546 6.977 6.977 0 0 0 .058 2.731l-.976.217a7.977 7.977 0 0 1-.066-3.121 7.977 7.977 0 0 1 1.13-2.91zm13.498 8.6l-.843-.538c.49-.768.826-1.629.988-2.546a6.977 6.977 0 0 0-.058-2.731l.976-.217a7.977 7.977 0 0 1 .066 3.121 7.977 7.977 0 0 1-1.13 2.91z', id: 'calendarReminder16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'calendarReminder16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#calendarReminder16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#calendarReminder16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#calendarReminder16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgCalendarReminder16.displayName = 'SvgCalendarReminder16';
exports.default = styles_1.withStyles(styles_2.default)(SvgCalendarReminder16);
//# sourceMappingURL=CalendarReminder16.js.map