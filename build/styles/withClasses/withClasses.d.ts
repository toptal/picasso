import React, { ComponentType, ReactNode } from 'react';
import { Classes } from '../types';
declare type ConfigItem = [ComponentType, Classes];
declare type Config = (classes: Classes) => ConfigItem[];
export interface WithClassesProps {
    classes: Classes;
    children: ReactNode;
}
declare const _default: (config: Config) => <P extends object>(Component: React.ComponentType<P>) => {
    (props: P & WithClassesProps): JSX.Element;
    displayName: string;
};
export default _default;
