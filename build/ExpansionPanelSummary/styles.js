import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
PicassoProvider.override(({ typography }) => ({
    MuiExpansionPanelSummary: {
        root: {
            fontSize: '1em',
            padding: '0.625em 0 0.5em',
            fontWeight: typography.fontWeights.semibold,
            minHeight: '2.45em',
            '&$expanded': {
                minHeight: '2.45em'
            },
            '&$disabled': {
                opacity: 1
            }
        },
        expandIcon: {
            margin: 0,
            padding: 0,
            '&$expanded': {
                transform: 'rotate(180deg)'
            }
        },
        content: {
            fontSize: '0.875em',
            margin: 0,
            '&$expanded': {
                margin: '0'
            }
        }
    }
}));
export default () => createStyles({
    root: {},
    content: {}
});
//# sourceMappingURL=styles.js.map