"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const palette_1 = __importDefault(require("../Picasso/config/palette"));
const OutlinedInput_1 = __importDefault(require("../OutlinedInput"));
const InputAdornment_1 = __importDefault(require("../InputAdornment"));
const Button_1 = __importDefault(require("../Button"));
const Loader_1 = __importDefault(require("../Loader"));
const Link_1 = __importDefault(require("../Link"));
const Typography_1 = __importDefault(require("../Typography"));
const Icon_1 = require("../Icon");
const utils_1 = require("../utils");
const styles_2 = __importDefault(require("./styles"));
const FileInputContent = styles_1.withStyles(styles_2.default)(({ classes, accept, onChange, value, status, disabled, error, progress, inputRef }) => {
    const getFilename = () => {
        if (error || progress) {
            return status;
        }
        if (value) {
            if (disabled) {
                return value.name;
            }
            return react_1.default.createElement(Link_1.default, { href: value.location }, value.name);
        }
        return status;
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Typography_1.default, { className: classnames_1.default(classes.inputValue, {
                [classes.inputValueDisabled]: disabled
            }), inline: true }, getFilename()),
        react_1.default.createElement("input", { type: 'file', className: classes.nativeInput, ref: inputRef, accept: accept, onChange: onChange })));
});
exports.FileInput = react_1.forwardRef(function FileInput({ classes, className, style, width, accept, progress, error, disabled, value, status, onChange }, ref) {
    // if `ref` is null then we need a ref to control the input
    // so we create another ref manually if needed and merge both of them
    const inputRef = utils_1.useCombinedRefs(ref, react_1.useRef(null));
    const inProgress = (utils_1.isNumber(progress) && progress <= 100) ||
        (utils_1.isBoolean(progress) && progress);
    const uploadButtonVariant = value || error ? 'secondary-blue' : 'primary-blue';
    const uploadButtonTitle = value || error ? 'Choose different file' : 'Choose File';
    const loaderValue = utils_1.isNumber(progress) && progress;
    const startAdornment = (react_1.default.createElement(InputAdornment_1.default, { className: classes.adornmentStart, disabled: disabled, position: 'start' }, value ? (react_1.default.createElement(Icon_1.Check16, { color: !disabled ? palette_1.default.green.main : undefined })) : (react_1.default.createElement(Icon_1.UploadDocument16, null))));
    const endAdornment = (react_1.default.createElement(InputAdornment_1.default, { position: 'end' }, inProgress ? (react_1.default.createElement(Loader_1.default, { className: classes.loader, size: 'small', value: utils_1.isNumber(progress) ? loaderValue : undefined })) : (react_1.default.createElement(Button_1.default, { className: classes.button, size: 'small', variant: uploadButtonVariant, disabled: disabled, onClick: () => inputRef.current && inputRef.current.click() }, uploadButtonTitle))));
    return (react_1.default.createElement(OutlinedInput_1.default, { ref: inputRef, className: className, style: style, classes: {
            root: classes.root,
            input: classes.input
        }, error: error, disabled: disabled, width: width, type: 'file', 
        // MUIv3 doesn't provide generic way to change type of component and props
        // that would be extensions of input component
        // https://github.com/mui-org/material-ui/blob/v3.x/packages/material-ui/src/InputBase/InputBase.d.ts#L18
        // @ts-ignore
        inputComponent: FileInputContent, 
        // @ts-ignore
        inputProps: {
            progress,
            error,
            disabled,
            value,
            onChange,
            accept,
            status
        }, startAdornment: startAdornment, endAdornment: endAdornment }));
});
exports.FileInput.displayName = 'FileInput';
exports.default = styles_1.withStyles(styles_2.default)(exports.FileInput);
//# sourceMappingURL=FileInput.js.map