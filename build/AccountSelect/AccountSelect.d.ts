import React, { FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
declare type Account = {
    /** User's id */
    id: string;
    /** URL of the page the user's item link goes to */
    href?: string;
    /** Full name of the user that is displayed next to the avatar */
    name: string;
    /** Position of the user at the listed company */
    position: string;
    /** Link to user's photo */
    avatar?: string;
};
declare type Accounts = Account[];
export interface Props extends StandardProps {
    /** List of available accounts */
    accounts: Accounts;
    /** Callback invoked when specific role record is clicked in the list */
    onSelect: (account: Account) => void;
}
export declare const AccountSelect: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "onSelect" | "accounts"> & import("@material-ui/core/styles").StyledComponentProps<"accountItem" | "accountLink">>;
export default _default;
