"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useCombinedRefs = (...refs) => {
    const targetRef = react_1.useRef(null);
    react_1.useEffect(() => {
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
exports.default = useCombinedRefs;
//# sourceMappingURL=use-combined-refs.js.map