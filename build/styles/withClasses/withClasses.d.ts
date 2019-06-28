import React, { ComponentType } from 'react';
import { Classes } from '../types';
declare type ConfigItem = [ComponentType, Classes];
declare type Config = (classes: Classes) => ConfigItem[];
declare const _default: (config: Config) => <P extends object>(Component: React.ComponentType<P>) => {
    (props: any): JSX.Element;
    displayName: string;
};
export default _default;
