import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import React, { useRef, useContext, useState } from 'react';
import { ModalProvider } from 'react-modal-hook';
import CssBaseline from '../CssBaseline';
import { palette, layout, transitions, typography, sizes, breakpoints, screens, shadows } from './config';
import FontsLoader from './FontsLoader';
import Provider from './PicassoProvider';
import NotificationsProvider from '../utils/Notifications/NotificationsProvider';
import globalStyles from './styles';
const picasso = {
    palette,
    layout,
    transitions,
    sizes,
    breakpoints,
    screens,
    shadows,
    typography,
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
const PicassoProvider = new Provider(createMuiTheme(picasso));
const RootContext = React.createContext({
    hasPageHeader: false,
    setHasPageHeader: () => { }
});
export const usePicassoRoot = () => {
    const context = useContext(RootContext);
    return context && context.rootRef ? context.rootRef.current : null;
};
export const usePageHeader = () => {
    const context = useContext(RootContext);
    return {
        hasPageHeader: context.hasPageHeader,
        setHasPageHeader: context.setHasPageHeader
    };
};
const PicassoGlobalStylesProvider = withStyles(globalStyles, {
    name: 'Picasso'
})((props) => {
    const { classes, children } = props;
    const rootRef = useRef(null);
    const [contextValue, setContextValue] = useState({
        rootRef,
        hasPageHeader: false,
        setHasPageHeader: (hasPageHeader) => setContextValue(Object.assign({}, contextValue, { hasPageHeader }))
    });
    return (React.createElement("div", { ref: rootRef, className: classes.root },
        React.createElement(RootContext.Provider, { value: contextValue }, children)));
});
const Picasso = ({ loadFonts, reset, children }) => (React.createElement(MuiThemeProvider, { theme: PicassoProvider.theme },
    loadFonts && React.createElement(FontsLoader, null),
    reset && React.createElement(CssBaseline, null),
    React.createElement(PicassoGlobalStylesProvider, null,
        React.createElement(ModalProvider, null,
            React.createElement(NotificationsProvider, null, children)))));
Picasso.defaultProps = {
    loadFonts: true,
    reset: true
};
export { PicassoProvider };
export default Picasso;
//# sourceMappingURL=Picasso.js.map