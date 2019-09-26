import { useRef, useEffect } from 'react';
const useCombinedRefs = (...refs) => {
    const targetRef = useRef(null);
    useEffect(() => {
        refs.forEach(ref => {
            if (!ref) {
                return;
            }
            if (typeof ref === 'function') {
                ref(targetRef.current);
            }
            else {
                // @ts-ignore
                ref.current = targetRef.current;
            }
        });
    }, [refs]);
    return targetRef;
};
export default useCombinedRefs;
//# sourceMappingURL=use-combined-refs.js.map