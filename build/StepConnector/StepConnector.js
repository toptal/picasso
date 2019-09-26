import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChevronRight16 as ChevronRightIcon } from '../Icon';
import styles from './styles';
export const StepConnector = ({ classes }) => {
    return React.createElement(ChevronRightIcon, { className: classes.connectorIcon });
};
StepConnector.displayName = 'StepConnector';
export default withStyles(styles)(StepConnector);
//# sourceMappingURL=StepConnector.js.map