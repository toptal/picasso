import React from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** Name of the current environment */
    environment: 'development' | 'staging' | 'temploy' | 'production';
    /** Name of the product to be rendered alongside enviroment (i.e. Blackfish, Talent, Portal, Billing) */
    productName: string;
}
export declare const EnvironmentBanner: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<HTMLDivElement>, "style" | "ref" | "className" | "key" | "environment" | "productName"> & import("@material-ui/core/styles").StyledComponentProps<"label" | "root" | "rootDevelopment" | "rootStaging" | "rootTemploy" | "labelDevelopment" | "labelStaging" | "labelTemploy">>;
export default _default;
