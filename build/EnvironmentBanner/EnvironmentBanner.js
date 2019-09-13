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
const styles_2 = __importDefault(require("./styles"));
exports.EnvironmentBanner = react_1.forwardRef(function EnvironmentBanner({ classes, environment, productName }, ref) {
    const [isShown, setIsShown] = react_1.useState(true);
    if (environment === 'production' || !isShown) {
        return null;
    }
    return (react_1.default.createElement("div", { ref: ref, className: classnames_1.default(classes.root, {
            [classes.rootDevelopment]: environment === 'development',
            [classes.rootTemploy]: environment === 'temploy',
            [classes.rootStaging]: environment === 'staging'
        }) },
        react_1.default.createElement("div", { onClick: () => setIsShown(false), className: classnames_1.default(classes.label, {
                [classes.labelDevelopment]: environment === 'development',
                [classes.labelTemploy]: environment === 'temploy',
                [classes.labelStaging]: environment === 'staging'
            }) }, `${productName} ${environment}`)));
});
exports.EnvironmentBanner.defaultProps = { environment: 'production' };
exports.EnvironmentBanner.displayName = 'EnvironmentBanner';
exports.default = styles_1.withStyles(styles_2.default)(exports.EnvironmentBanner);
//# sourceMappingURL=EnvironmentBanner.js.map