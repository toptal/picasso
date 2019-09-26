import { createStyles } from '@material-ui/core/styles';
export default ({ palette, zIndex }) => createStyles({
    menu: {
        left: 0,
        right: 0,
        zIndex: zIndex.drawer,
        position: 'absolute',
        backgroundColor: palette.common.white
    },
    scrollView: {
        maxHeight: '10.125em',
        overflowY: 'auto'
    }
});
//# sourceMappingURL=styles.js.map