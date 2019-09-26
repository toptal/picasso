import React, { forwardRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import styles from './styles';
export const EnvironmentBanner = forwardRef(function EnvironmentBanner({ classes, environment, productName }, ref) {
    const [isShown, setIsShown] = useState(true);
    if (environment === 'production' || !isShown) {
        return null;
    }
    return (React.createElement("div", { ref: ref, className: cx(classes.root, {
            [classes.rootDevelopment]: environment === 'development',
            [classes.rootTemploy]: environment === 'temploy',
            [classes.rootStaging]: environment === 'staging'
        }) },
        React.createElement("div", { onClick: () => setIsShown(false), className: cx(classes.label, {
                [classes.labelDevelopment]: environment === 'development',
                [classes.labelTemploy]: environment === 'temploy',
                [classes.labelStaging]: environment === 'staging'
            }) }, `${productName} ${environment}`)));
});
EnvironmentBanner.defaultProps = { environment: 'production' };
EnvironmentBanner.displayName = 'EnvironmentBanner';
export default withStyles(styles)(EnvironmentBanner);
//# sourceMappingURL=EnvironmentBanner.js.map