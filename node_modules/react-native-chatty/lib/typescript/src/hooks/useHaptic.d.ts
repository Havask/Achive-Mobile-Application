import type { HapticType } from '../types/Chatty.types';
/**
 * `useHaptic` returns a `trigger` function that triggers haptic feedback
 * @returns A function that triggers haptic feedback.
 */
export declare function useHaptic(): {
    trigger: (type: HapticType) => Promise<void>;
};
