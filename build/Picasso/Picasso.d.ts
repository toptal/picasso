import { FunctionComponent, ReactNode } from 'react';
import Provider from './PicassoProvider';
declare const PicassoProvider: Provider;
export declare const usePicassoRoot: () => HTMLDivElement | null;
export declare const usePageHeader: () => {
    hasPageHeader: boolean;
    setHasPageHeader: (value: boolean) => void;
};
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
