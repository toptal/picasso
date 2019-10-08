import React, { forwardRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import Container from '../../Container';
import Button from '../../Button';
import Dropdown from '../../Dropdown';
import { Overview16, Close16 } from '../../Icon';
import { useBreakpoint } from '../../utils';
import SidebarMenu from '../SidebarMenu';
import SidebarItem from '../SidebarItem';
import SidebarLogo from '../SidebarLogo';
import styles from './styles';
const SmallScreenSidebarWrapper = ({ classes, children }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const handleShowSidebar = () => setShowSidebar(true);
    const handleHideSidebar = () => setShowSidebar(false);
    return (React.createElement(Dropdown, { content: children, className: classes.responsiveWrapper, offset: { top: 0.4 }, onOpen: handleShowSidebar, onClose: handleHideSidebar },
        React.createElement(Button, { icon: showSidebar ? React.createElement(Close16, null) : React.createElement(Overview16, null), circular: true, variant: 'flat-white' })));
};
export const SidebarContext = React.createContext({});
// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef(function Sidebar({ children, variant, className, style, classes }, ref) {
    const isCompactLayout = useBreakpoint(['small', 'medium']);
    const sidebar = (React.createElement(Container, { ref: ref, flex: true, direction: 'column', style: style, className: cx(classes.root, className, classes[variant]) },
        React.createElement("div", { className: classes.spacer }),
        React.createElement(SidebarContext.Provider, { value: { variant } }, children)));
    return isCompactLayout ? (React.createElement(SmallScreenSidebarWrapper, { classes: classes }, sidebar)) : (sidebar);
});
Sidebar.defaultProps = {
    variant: 'light'
};
Sidebar.displayName = 'Sidebar';
Sidebar.Menu = SidebarMenu;
Sidebar.Item = SidebarItem;
Sidebar.Logo = SidebarLogo;
export default withStyles(styles)(Sidebar);
//# sourceMappingURL=Sidebar.js.map