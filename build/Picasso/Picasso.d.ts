import { FunctionComponent, ReactNode } from 'react';
import Provider from './PicassoProvider';
declare const PicassoProvider: Provider;
interface PicassoProps {
    children?: ReactNode;
    /** Whether to load fonts file to the page */
    loadFonts?: boolean;
    /** Whether to apply Picasso CSS reset */
    reset?: boolean;
}
declare const Picasso: FunctionComponent<PicassoProps>;
export { PicassoProvider };
export default Picasso;
