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
const styles_1 = require("@material-ui/core/styles");
const react_1 = __importStar(require("react"));
const CssBaseline_1 = __importDefault(require("../CssBaseline"));
const config_1 = require("./config");
const FontsLoader_1 = __importDefault(require("./FontsLoader"));
const PicassoProvider_1 = __importDefault(require("./PicassoProvider"));
const NotificationsProvider_1 = __importDefault(require("../utils/Notifications/NotificationsProvider"));
const styles_2 = __importDefault(require("./styles"));
const picasso = {
    palette: config_1.palette,
    layout: config_1.layout,
    transitions: config_1.transitions,
    sizes: config_1.sizes,
    breakpoints: config_1.breakpoints,
    screens: config_1.screens,
    shadows: config_1.shadows,
    typography: config_1.typography,
    props: {
        MuiButtonBase: {
            disableRipple: true
        },
        MuiList: {
            disablePadding: true
        },
        MuiPaper: {
            square: true
        },
        MuiOutlinedInput: {
            notched: false
        }
    }
};
const PicassoProvider = new PicassoProvider_1.default(styles_1.createMuiTheme(picasso));
exports.PicassoProvider = PicassoProvider;
const RootContext = react_1.default.createContext({
    rootRef: null,
    hasPageHeader: false,
    setHasPageHeader: () => { }
});
exports.usePicassoRoot = () => {
    const context = react_1.useContext(RootContext);
    return context && context.rootRef ? context.rootRef.current : null;
};
exports.usePageHeader = () => {
    const context = react_1.useContext(RootContext);
    return {
        hasPageHeader: context.hasPageHeader,
        setHasPageHeader: context.setHasPageHeader
    };
};
const PicassoGlobalStylesProvider = styles_1.withStyles(styles_2.default, {
    name: 'Picasso'
})((props) => {
    const { classes, children } = props;
    const rootRef = react_1.createRef();
    const [contextValue, setContextValue] = react_1.useState({
        rootRef,
        hasPageHeader: false,
        setHasPageHeader: (hasPageHeader) => setContextValue(Object.assign({}, contextValue, { hasPageHeader }))
    });
    return (react_1.default.createElement("div", { ref: rootRef, className: classes.root },
        react_1.default.createElement(RootContext.Provider, { value: contextValue }, children)));
});
const Picasso = ({ loadFonts, reset, children }) => (react_1.default.createElement(styles_1.MuiThemeProvider, { theme: PicassoProvider.theme },
    loadFonts && react_1.default.createElement(FontsLoader_1.default, null),
    reset && react_1.default.createElement(CssBaseline_1.default, null),
    react_1.default.createElement(PicassoGlobalStylesProvider, null,
        react_1.default.createElement(NotificationsProvider_1.default, null, children))));
Picasso.defaultProps = {
    loadFonts: true,
    reset: true
};
exports.default = Picasso;
//# sourceMappingURL=Picasso.js.map