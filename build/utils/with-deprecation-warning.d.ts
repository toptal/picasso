import React from 'react';
declare const withDeprecationWarning: {
    (oldName: string, newName?: string | undefined): <T>(NewComponent: React.ComponentType<T>) => React.ComponentType<T>;
    displayName: string;
};
export default withDeprecationWarning;
